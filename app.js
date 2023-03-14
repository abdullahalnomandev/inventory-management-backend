import "colors";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import globalErrorHandler from "./controllers/errorController.js";
import BrandRoutes from "./routes/brandRoutes.js";
import CategoryRoutes from "./routes/categoryRoutes.js";
import ProductRoutes from "./routes/productRoutes.js";
import StockRoutes from "./routes/stockRoutes.js";
import StoreRoutes from "./routes/storeRoutes.js";
import SupplierRoutes from "./routes/supplierRoutes.js";
import UserRoutes from "./routes/userRoutes.js";
import AppError from "./utils/appError.js";
mongoose.set("strictQuery", true);
dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static("images"))

// Routes
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/product", ProductRoutes);
app.use("/api/v1/brand", BrandRoutes);
app.use("/api/v1/category", CategoryRoutes);
app.use("/api/v1/store", StoreRoutes);
app.use("/api/v1/supplier", SupplierRoutes);
app.use("/api/v1/stock", StockRoutes);

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
    console.log("err", error.red);
  }
};

app.listen(5000 || process.env.PORT, () => {
  connection();
  console.log("connected successfully".yellow.bold);
});
