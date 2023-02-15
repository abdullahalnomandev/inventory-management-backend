import mongoose from "mongoose";
import validator from "validator";

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a category name"],
      trim: true,
      lowercase:true,
      unique: true,
      
    },
    description: {
      type: String
    },
    imageUrl: {
      type: String,
      validate: [validator.isURL, "Please enter a valid image url"]
    }
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);
