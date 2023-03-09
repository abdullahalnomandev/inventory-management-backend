import { createStockService, getAllStockService } from "../services/stockServices.js";
import AppError from "../utils/appError.js";


const getStock = async (req, res, next) => {
    try {
        let filters = {...request.query}
        
        const stock = await getAllStockService();
        res.status(200).json({
            status: 'success',
            result: stock.length,
            data: stock
        })

    } catch (error) {
        next(new AppError(error, 400));
    }

}

const createStock= async (req, res, next) => {
    try {
        const stock= await createStockService(req.body);
        res.status(201).json({
            status: 'success',
            data: stock
        })

    } catch (error) {
        next(new AppError(error, 400));
    }

}

export { getStock, createStock };

