import mongoose from "mongoose";
import validator from "validator";
const { ObjectId } = mongoose.Schema.Types;

const SupplierSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Please provide a name."],
            lowercase: true,
            minLength: [3, "Name must be at least 3 characters"],
            maxLength: [100, "Name is too long"],

        },
        email: {
            type: String,
            validate: [validator.isEmail, "Please provide a valid email address."],
            lowercase: true,
            unique: true,
        },
        contractNumber: [
            {
                type: String,
                required: [true, "Please provide a contract number"],
                validate: {
                    validator: (value) => {
                        return validator.isMobilePhone(value);
                    },
                    message: "Please provide a valid contract number"
                }
            }
        ],

        emergencyContractNumber: [
            {
                type: String,
                required: [true, "Please provide a contract number"],
                validate: {
                    validator: (value) => {
                        return validator.isMobilePhone(value);
                    },
                    message: "Please provide a valid contract number"
                }
            }
        ],
        tradeLicenseNumber: {
            type: Number,
            required: [true, "Please provide a valid trade license number"],
        },
        presentAddress: {
            type: String,
            required: [true, "Please provide a valid address"]
        },
        permanentAddress: {
            type: String,
            required: [true, "Please provide a valid permanent address"]
        },
        location: {
            type: String,
            lowercase: true,
            required: [true, "Please provide a supplier name."],
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
        },
        imageUrl: {
            type: "string",
            validate: [validator.isURL, "Please provide a valid URL"]
        },
        nationalImageUrl: {
            type: "string",
            required: true,
            validate: [validator.isURL, "Please provide a valid URL"]
        },
        status: {
            type: String,
            enum: {
                values: ["active", "inactive"],
            },
            default: "active"
        },
        brand: {
            brandName: {
                type: String,
                trim: true,
                required: true,
            },
            id: {
                type: ObjectId,
                required: true,
                ref: "Brand"
            }
        },


    },
    {
        timestamps: true,
    }
);
export default mongoose.model("Supplier", SupplierSchema);
