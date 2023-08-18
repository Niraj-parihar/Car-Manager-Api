const mongoose = require("mongoose");
const validator = require("validator");

const adminSchema = new mongoose.Schema({
  admin_id: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
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
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
