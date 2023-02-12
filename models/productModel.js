import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLenght: [100, " Name is too large"]
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"]
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["pcs", "kg", "litter"],
        message: "unit value can't be {VALUE} , must be kg/litter/pcs"
      }
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        }
      },
      message: "Quantity must be an integer"
    },
    status: {
      type: String,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}"
      }
    }
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier"
    // },
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    //   }
    // ]
  },
  { timestamps: true }
);

ProductSchema.pre("save", function (next) {
  if (this.quantity === 0) {
    this.status = "out-of-stock";
  }
  next();
});


// ProductSchema.post("save", (doc, next) => {
//   console.log("After middle ");
//   next();
// });
export default mongoose.model("Product", ProductSchema);
