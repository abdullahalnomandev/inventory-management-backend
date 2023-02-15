import { createBrandServices, getBrandServices } from "../services/brandServices.js";
import AppError from "../utils/appError.js";

const getBrand = async (req, res, next) => {
  try {

    const product = await getBrandServices();
    res.status(200).json({
      status: "success",
      result: product.length,
      data: product,
    });
  } catch (error) {
    next(new AppError(error, 404));
  }
};

const createBrand = async (req, res, next) => {
  try {
    const brand = await createBrandServices(req.body);
    res.status(200).json({
      status: "success",
      data: brand,
    });
  } catch (error) {
    next(new AppError(error, 404));
  }
};

export { getBrand, createBrand };

