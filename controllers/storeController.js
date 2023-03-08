import { createStoreService, getAllStoreService, getStoreByIdSErvices } from "../services/storeServices.js";
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
        next(new AppError(error, 400));
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
        next(new AppError(error, 400));
    }

}

const getStoreById = async (req, res, next) => {
    const {id} = req.params;
    try {
        const store = await getStoreByIdSErvices(id);
        res.status(201).json({
            status: 'success',
            data: store
        })

    } catch (error) {
        next(new AppError(error, 400));
    }

}




export { getAllStors, createStore, getStoreById };

