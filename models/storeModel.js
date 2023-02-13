import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const StoreSChema = mongoose.Schema(
  {
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
    description: {
      type: String
    },
    status: {
      type: String,
      enum: {
        values: ["active", "inactive"]
      },
      default: "active"
    },
    manager: {
      name: String,
      contractNumber: String,
      id: {
        type: ObjectId,
        ref: "User"
      }
    }
  },
  {
    timestamps: true
  }
);
export default mongoose.model("Store", StoreSChema);
