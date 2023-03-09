import Brand from "../models/brandModel.js";

const getBrandServices = async ()=>{
  // const brand = await Brand.find({}).populate("products","name description -_id");
  const brand = await Brand.find({});
    return brand;
};

const createBrandServices = async (data)=>{
  const brand = await Brand.create(data);
  return brand;
}



export { createBrandServices, getBrandServices };

