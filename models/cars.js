const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  car_type: {
    type: String,
    trim: true,
    required: true,
  },
  car_name: {
    type: String,
    trim: true,
    lowercase: true,
  },
  car_model: {
    type: String,
    required: true,
  },
  car_info: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
    note: "store additional fields",
  },
});

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
