import Brand from "../models/brandModel.js";
import Supplier from "../models/supplierModel.js";


const getAllSupplierService = async () => {
    const suppliers = await Supplier.find({})
    return suppliers;
}
const createSupplierService = async (data) => {
    const supplier = await Supplier.create(data);
    // const { id: supplierId, poc_brand } = supplier;
    await Brand.updateOne({ _id: supplier.poc_brand.id }, { $push: { suppliers: supplier.id } }, { runValidators: true });
    return supplier;

};



export { getAllSupplierService, createSupplierService };

