import express from "express";
import dotenv from "dotenv";
mongoose.set("strictQuery", true);
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
const app = express();
import globalErrorHandler from "./controllers/errorController.js";
import AuthRoutes from "./routes/authRoutes.js";
import AppError from "./utils/appError.js";
import cookieParser from "cookie-parser";
import "colors";
import ProductRoutes from "./routes/productRoutes.js";

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/product", ProductRoutes);

// Error Handler
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

// Connection
const connection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true
    });
  } catch (error) {
    console.log(error.red);
  }
};

app.listen(5000 || process.env.PORT, () => {
  connection();
  console.log("connected successfully".yellow.bold);
});
