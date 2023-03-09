import Stock from "../models/stockModel.js";

const getAllStockService = async () =>{
    const  stock = await Stock.find();
    return stock;

}

const createStockService = async (data) =>{
    const  stock = await Stock.create(data);
    return stock;

}

export { getAllStockService, createStockService };

