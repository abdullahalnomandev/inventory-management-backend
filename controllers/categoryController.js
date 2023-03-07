import { createCategoryService, getAllCategoriesServices } from "../services/categoryServices.js";
import AppError from "../utils/appError.js";



const getAllCategories = async (req,res,next)=>{
    try {
        const categories = await getAllCategoriesServices();
        res.status(200).json({
            status:"success",
            result: categories.length,
            data: categories
        })
    } catch (error) {
        next(new AppError(error,404))
    }
}

const createCategory = async (req,res,next)=>{
    try {
        const createCategory = await createCategoryService(req.body);
        res.status(201).json({
            status:"success",
            result: createCategory
        })
    } catch (error) {
        next(new AppError(error,404))
    }
}

export { getAllCategories, createCategory };

