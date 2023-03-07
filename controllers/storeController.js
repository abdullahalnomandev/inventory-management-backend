import { createStoreService, getAllStoreService } from "../services/storeServices.js";
import AppError from "../utils/appError.js";


const getAllStors = async (req, res, next) => {
    try {
        const store = await getAllStoreService();
        res.status(200).json({
            status: 'success',
            result: store.length,
            data: store
        })

    } catch (error) {
        next(new AppError(error, 404));
    }

}

const createStore = async (req, res, next) => {
    try {
        const createStore = await createStoreService(req.body);
        res.status(201).json({
            status: 'success',
            data: createStore
        })

    } catch (error) {
        next(new AppError(error, 404));
    }

}


export { getAllStors, createStore };

