const express = require("express");
const Dealership = require("../models/dealership");
const Deal = require("../models/deal");
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

//dealership update
router.patch("/update/:id", async (req, res) => {
  // const updates = Object.keys(req.body);
  // const allowedUpdates = [
  //   "dealership_email",
  //   "dealership_name",
  //   "dealership_location",
  //   "dealership_password",
  //   "dealership_info",
  //   // "cars",
  //   // "deals",
  //   // "sold_vehicles",
  // ];

  // const isValidOperation = updates.every((update) => {
  //   allowedUpdates.includes(update);
  // });

  // if (!isValidOperation) {
  //   return res.status(400).send({ error: "Invalid updates" });
  // }

  try {
    const dealership = await Dealership.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!dealership) {
      return res.status(404).send("Dealership not Found");
    }

    res.send(dealership);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong: ", error });
  }
});

//delaership delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const dealership = await Dealership.findByIdAndDelete(req.params.id);
    if (!dealership) {
      return res.status(404).send();
    }
    res.send(dealership);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
