import Brand from "../models/brandModel.js";
import Supplier from "../models/supplierModel.js";


const getAllSupplierService = async () => {
    const suppliers = await Supplier.find({})
    return suppliers;
}

const createSupplierService = async (data) => {
    const supplier = await Supplier.create(data);
    const { id: supplierId, name, brand } = supplier;
    console.log(supplierId, name);
    const brands = await Brand.updateOne({ _id: brand.id }, { $push: { suppliers: { name, supplilerId: supplierId } } }, { runValidators: true })
    return supplier;
};

export { getAllSupplierService, createSupplierService };

