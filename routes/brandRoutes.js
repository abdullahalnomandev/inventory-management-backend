import express from "express";
import * as BrandController from "../controllers/brandController.js";
const router = express.Router();

router.get("/", BrandController.getBrand);
router.post("/", BrandController.createBrand);

export default router;
