const express = require("express");
const Dealership = require("../models/dealership");
const router = new express.Router();

//dealership register
router.post("/register", async (req, res) => {
  const dealership = new Dealership(req.body);
  try {
    await dealership.save();
    res.status(201).send(dealership);
  } catch (err) {
    res.status(500).send(err);
  }
});

//dealerships read
router.get("/", async (req, res) => {
  try {
    const dealerships = await Dealership.find();
    res.status(200).send(dealerships);
  } catch (error) {
    res.status(500).json({ message: "Internal server error: ", error });
  }
});

//dealership read
router.get("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const dealership = await Dealership.findById(_id);
    if (!dealership) {
      return res.status(404).send("Dealership not Found");
    }
    res.status(200).send(dealership);
  } catch (error) {
    res.status(500).json({ message: "Internal server error: ", error });
  }
});

module.exports = router;
