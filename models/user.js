const mongoose = require("mongoose");
const validator = require("validator");
const SoldVehicle = require("./soldvehicles");

const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
      trim: true,
    },
    user_email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    user_password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "password');
        }
      },
    },
    user_location: {
      type: String,
      trim: true,
      required: true,
    },
    user_info: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    vehicle_info: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SoldVehicle",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
