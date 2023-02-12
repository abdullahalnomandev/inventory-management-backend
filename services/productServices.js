import Product from "../models/productModel.js";

const getProductService = async (filters, queries) => {

  const products = await Product.find(filters)
    .select(queries.fields)
    .sort(queries.sortBy);

  return products;
};

const createProductService = async (data) => {
  const product = await Product.create(data);
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
