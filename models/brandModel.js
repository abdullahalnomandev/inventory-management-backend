import mongoose from "mongoose";
import validator from "validator";
const { ObjectId } = mongoose.Schema.Types;

const BrandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a brand name."],
      maxLength: 100,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Please provide a valid email address."],
      lowercase: true,
    },
    website: {
      type: String,
      validate: [validator.isURL, "Please provide a valid URL."],
    },
    location: {
      type: String,
    },
    status: {
      type: String,
      enum: {
        values: ["active", "inactive"],
        message: "{VALUE} is not a valid status. Please give active/inactive status",
      },
      default: "active",
    },
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    suppliers: [
      {
        name: String,
        contractNumber: String,
        id: {
          type: ObjectId,
          ref: "Supplier",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Brand", BrandSchema);
