import mongoose from "mongoose";
import validator from "validator";
const { ObjectId } = mongoose.Schema.Types;

const StockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product"
    },
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLenght: [100, " Name is too large"]
    },
    description: {
      type: String,
      required: true
    },
    imageUrls: [
      {
        type: String,
        required: true,
        validate:[validator.isURL,"Please provide a valid URL"]
      }
    ],
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["pcs", "kg", "litter", "bag"],
        message: "unit value can't be {VALUE} , must be kg/litter/pcs/bag"
      }
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Product Price can't be negative"]
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Product quantity can't be negative"]
    },
    category: {
      type: String,
      required: true
    },
    brand: {
      name: {
        type: String,
        required: true
      },
      id: {
        type: ObjectId,
        ref: "Brand"
      }
    },
    status: {
      type: String,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}"
      }
    },
    store: {
      name: {
        type: String,
        trim: true,
        required: [true, "Please provide a brand name."],
        enum: {
          values: [
            "dhaka",
            "chittagong",
            "rajshahi",
            "sylhet",
            "khulna",
            "barishal",
            "rangpur",
            "mymenshingh"
          ],
          message: `{VALUE} is not a valid brand name`
        },
        lowercase: true
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Store"
      }
    },
    suppliedBy: {
      name: String,
      id: {
        type: ObjectId,
        required: true,
        ref: "Supplier"
      }
    },
    sellCount:{
      type: Number,
      default: 0,
      min: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Stock", StockSchema);
