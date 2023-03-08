import { createProductService, getProductService, updateProductService } from "../services/productServices.js";
import AppError from "../utils/appError.js";

const getProduct = async (req, res, next) => {
  try {

    // price: { gt: '20' }
    // {price:{$gt:50}}

    const filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit", "fields"];
    excludeFields.map((field) => delete filters[field]);

    // gt,lt,gee .lte

    const queries = {}

    if(req.query.sort){
      const sorting = req.query.sort.split(',').join(' ');
      queries.sortBy = sorting;
    }

    if(req.query.fields){
      const fields = req.query.fields.split(',').join(' ' );
      queries.fields = fields;
    }

    const product = await getProductService(filters,queries); ;
    res.status(200).json({
      status: "success",
      result:product.length,
      data: product
    });
  } catch (error) {
    next(new AppError(error, 404));
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await createProductService(req.body);
    res.status(200).json({
      status: "success",
      data: product
    });
  } catch (error) {
    next(new AppError(error, 404));
  }
};

const updateProduct = async (req, res, next) => {
  const {id} = req.params;
  try {
    const product = await updateProductService(id,req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully updated product."
    });
  } catch (error) {
    next(new AppError(error, 404));
  }
};

const deleteProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await updateProductService(id, req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully updated product."
    });
  } catch (error) {
    next(new AppError(error, 404));
  }
};

const fileUpload = async (req, res, next) => {
  try {
    res.status(200).json(req.files)
  } catch (error) {
    next(new AppError(error, 404));
  }
};

export { getProduct, createProduct, updateProduct, deleteProductById, fileUpload };

