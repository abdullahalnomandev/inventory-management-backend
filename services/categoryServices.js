import Category from "../models/categoryModel.js";


const getAllCategoriesServices = () =>{
    const categories = Category.find();
    return categories;
}

const createCategoryService = (category) =>{
    const categories = Category.create(category);
    return categories;
}
export { getAllCategoriesServices, createCategoryService };

