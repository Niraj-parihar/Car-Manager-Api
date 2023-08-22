const mongoose = require("mongoose");
const validator = require("validator");
const Car = require("./cars");
const Deal = require("./deal");
const SoldVehicle = require("./soldvehicles");

const dealershipSchema = new mongoose.Schema(
  {
    dealership_email: {
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
    dealership_name: {
      required: true,
      type: String,
    },
    dealership_location: {
      type: String,
      required: true,
    },
    dealership_password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password cannot contain password");
        }
      },
    },
    dealership_info: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    cars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
      },
    ],
    deals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Deal",
      },
    ],
    sold_vehicles: [
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

const Dealership = mongoose.model("Dealership", dealershipSchema);
module.exports = Dealership;
