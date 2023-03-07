import "colors";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import globalErrorHandler from "./controllers/errorController.js";
import AuthRoutes from "./routes/authRoutes.js";
import BrandRoutes from "./routes/brandRoutes.js";
import CategoryRoutes from "./routes/categoryRoutes.js";
import ProductRoutes from "./routes/productRoutes.js";
import AppError from "./utils/appError.js";
mongoose.set("strictQuery", true);
dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/product", ProductRoutes);
app.use("/api/v1/brand",BrandRoutes);
app.use("/api/v1/category", CategoryRoutes);

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
    console.log("err",error.red);
  }
};

app.listen(5000 || process.env.PORT, () => {
  connection();
  console.log("connected successfully".yellow.bold);
});
