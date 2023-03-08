import { createSupplierService, getAllSupplierService } from "../services/supplierServices.js";
import AppError from "../utils/appError.js";

const getAllSuppliers = async (req,res,next) =>{

try {
    const supplier = await getAllSupplierService()
    res.status(200).json({
        status:'success',
        result:supplier.length,
        data:supplier
    })
    
} catch (error) {
    next(new AppError(error,400))
}


}
const createSupplier = async (req, res, next) => {
    try {
        const supplier = await createSupplierService(req.body);
        res.status(201).json({
            status: 'success',
            data: supplier
        })

    } catch (error) {
        next(new AppError(error, 400))
    }

}

export { getAllSuppliers, createSupplier };

