import mongoose from "mongoose";
import Stock from "../models/stockModel.js";
const { ObjectId } = mongoose.Types;


const getAllStockByIdService = async (stockId) => {
    // const stocks = await Stock.find({ _id: stockId })
    //     .populate("brand.id")
    //     .populate("suppliedBy.id", "name email");

    // Aggregate
    const stocks = await Stock.aggregate([
        {
            $match: {
                _id: ObjectId(stockId)
            }
        },
        {
            $lookup: {
                from: 'brands',
                localField: 'brand.name',
                foreignField: 'name',
                as: 'brandDetails'
            }
        },
        {
            $project: {
                productId: 1,
                name: 1,
                price: 1,
                'brand.name': { $toLower: '$brand.name' },
                quantity: 1,
                "brandDetails": {
                    $map: {
                        input: "$brandDetails",
                        as: "b",
                        in: {
                            name: "$$b.name",
                            description: "$$b.description",
                            email: "$$b.email",
                            location: "$$b.location"
                        }
                    }
                }

            }
        },
        // {
        //     $group: { _id: '$brand.name', totalProductPrice: {$sum:{ $multiply: ['$price','quantity'] }} }
        // }
    ])

    return stocks;

}

const createStockService = async (data) => {
    const stock = await Stock.create(data);
    return stock;

}

export { createStockService, getAllStockByIdService };

