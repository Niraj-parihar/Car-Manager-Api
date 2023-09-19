const mongoose = require("mongoose");

const soldVehicleSchema = new mongoose.Schema(
  {
    vehicle_id: {
      type: String,
      required: true,
      unique: true,
    },
    car_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
    vehicle_info: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const SoldVehicle = mongoose.model("SoldVehicle", soldVehicleSchema);

module.exports = SoldVehicle;
