import bcrypt from 'bcryptjs';
import { mongoose } from "mongoose";
import validator from 'validator';

const UserSchema = mongoose.Schema({

  email: {
    type: String,
    lowercase: true,
    required: [true, "Please provide your email address"],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please provide a valid email address"
    ],
    validate: {
      validator: function (value) {
        return this.model("User")
          .findOne({ email: value })
          .then((user) => !user);
      },
      message: (props) => `${props.value} is already used by another user`
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: function (value) {
        validator.isStrongPassword(value, {
          minlength: 6,
          minLowercase: 3,
          minNumbers: 1,
          minSymbols: 1
        })
      },
      message: "Password {VALUE} is not strong enough."
    }
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Password don't match!"
    }
  }
  ,
  role: {
    type: String,
    enum: {
      values: ["buyer", "store-manager", "admin"],
      message: "The {VALUE} is not a correct role"
    },
    default: 'buyer'
  },
  firstName: {
    type: String,
    required: [true, "Please provide the first name"],
    trim: true,
    minLength: [3, "Name must be at least 3 characters."],
    maxLength: [100, "Name is too large"]
  },
  lastName: {
    type: String,
    required: [true, "Please provide the first name"],
    trim: true,
    minLength: [3, "Name must be at least 3 characters."],
    maxLength: [100, "Name is too large"]
  },
  contractNumber: {
    type: String,
    validate: [validator.isMobilePhone, "Please provide contract number"]
  },
  shippingAddress: {
    type: String
  },
  imageUrl: {
    type: String,
    validate: [validator.isURL, "Please provide a valid url"]
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'inactive', 'blocked']
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date
}, {
  timestamps: true
});

UserSchema.pre("save", function (next) {
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password);
  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();

})

export default mongoose.model("User", UserSchema);

