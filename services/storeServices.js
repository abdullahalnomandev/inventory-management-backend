import Store from "../models/storeModel.js";



const getAllStoreService = async () =>{
    const  store = await Store.find();
    return store;

}

const createStoreService = async (data) =>{
    const  store = await Store.create(data);
    return store;

}
const getStoreByIdSErvices = async (storeId) => {
    const store = await Store.findById(storeId);
    return store;

}

export { createStoreService, getAllStoreService, getStoreByIdSErvices };

