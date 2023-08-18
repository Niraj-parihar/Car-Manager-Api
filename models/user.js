const mongoose = require("mongoose");
const ObjectID = require("mongodb");
const validator = require("validator");
require("./soldvehicles");

//creating a mongoose model
const userSchema = new mongoose.Schema(
  {
    user_id: {
      _id: new ObjectID(),
    },
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
        if (value.toLowerCase().include("password")) {
          throw new Error("Password cannot contain password");
        }
      },
    },
    user_location: {
      type: String,
      trim: true,
      required: true,
    },
    vehicle_info: {
      type: String,
      trim: true,
    },
    user_info: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
      note: "store additional fields",
    },
    vehicle_info: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "soldvehicles",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//   vehicle_info list_of_id

const User = mongoose.model("User", userSchema);
module.exports = User;
