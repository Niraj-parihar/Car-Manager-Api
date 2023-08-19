const express = require("express");
const Car = require("../models/cars");
const router = new express.Router();

//create routes
router.post("/newcar", async (req, res) => {
  const newCar = new Car(req.body);
  try {
    newCar.save();
    res.status(201).send(newCar);
  } catch (err) {
    res.status(500).json({ message: "Internal server error: ", err });
  }
});

module.exports = router;
