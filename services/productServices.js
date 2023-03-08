import Brand from "../models/brandModel.js";
import Product from "../models/productModel.js";

const getProductService = async (filters, queries) => {
  const products = await Product.find(filters)
    .select(queries.fields)
    .sort(queries.sortBy);

  return products;
};

const createProductService = async (data) => {
  const product = await Product.create(data);
  const {id:productId,brand} = product;
  await Brand.updateOne({ _id: brand.id }, { $push: { products: productId } }, { runValidators: true })
  return product;
};

const updateProductService = async (productId, data) => {
  console.log(productId, data);
  const product = await Product.updateOne(
    { _id: productId },
    { $inc: { data } },
    { runValidators: true }
  );
  return product;
};
export { getProductService, createProductService, updateProductService };

