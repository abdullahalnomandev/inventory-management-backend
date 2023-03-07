import mongoose from "mongoose";
import validator from "validator";
const { ObjectId } = mongoose.Schema.Types;

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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
        validate: {
          validator: (value) => {
            if (Array.isArray(value)) {
              return false;
            }
            let isValid = true;
            value.map((url) => {

              if (!validator.isURL(url)) {
                isValid = false;
              }
            });
            return isValid;
          },
          message: " Please provide valid image urls"
        }
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
    category: {
      type: String,
      // required: true
    },
    brand: {
      name: {
        type: String,
        // required: true
      },
      id: {
        type: ObjectId,
        ref: "Brand"
      }
    }
  },
  { timestamps: true }
);

// ProductSchema.pre("save", function (next) {
//   if (this.quantity === 0) {
//     this.status = "out-of-stock";
//   }
//   next();
// });

// ProductSchema.post("save", (doc, next) => {
//   console.log("After middle ");
//   next();
// });
export default mongoose.model("Product", ProductSchema);
