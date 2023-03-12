import { createStockService, getAllStockByIdService } from "../services/stockServices.js";
import AppError from "../utils/appError.js";


const createStock = async (req, res, next) => {
    try {
        const stock = await createStockService(req.body);
        res.status(201).json({
            status: 'success',
            data: stock
        })

    } catch (error) {
        next(new AppError(error, 400));
    }

}

const getStockById = async (req, res, next) => {
    const {id} =req.params;
    try {
        const stock = await getAllStockByIdService(id);
        res.status(200).json({
            status: 'success',
            data: stock
        })

    } catch (error) {
        next(new AppError(error, 400));
    }

}

export { getStockById, createStock };

