const express = require("express");
const auth_dealership = require("../middleware/auth_dealership");
const Dealership = require("../models/dealership");
const Deal = require("../models/deal");
const router = new express.Router();

//dealership register
router.post("/register", async (req, res) => {
  const dealership = new Dealership(req.body);
  try {
    await dealership.save();
    const token = await dealership.generateAuthToken();
    res.status(201).send({ dealership, token });
  } catch (err) {
    res.status(500).send(err);
  }
});

//dealership login
router.post("/login", async (req, res) => {
  try {
    const dealership = await Dealership.findByCredentials(
      req.body.dealership_email,
      req.body.dealership_password
    );
    const token = await dealership.generateAuthToken();
    res.send({ dealership, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

//dealership logout
router.post("/logout", auth_dealership, async (req, res) => {
  try {
    req.dealership.tokens = req.dealership.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.dealership.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

//dealership logoutAll
router.post("/logoutAll", auth_dealership, async (req, res) => {
  try {
    req.dealership.tokens = [];
    await req.dealership.save();
    res.send();
  } catch (error) {
    req.status(500).send(error);
  }
});

//dealership profile read
router.get("/dealership_me", auth_dealership, async (req, res) => {
  res.send(req.dealership);
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

//dealership delete
router.delete("/delete/delete_dealership_me", auth_dealership, async (req, res) => {
  try {
    // const dealership = await Dealership.findByIdAndDelete(req.params.id);
    // if (!dealership) {
    //   return res.status(404).send();
    // }
    await req.dealership.remove();
    res.send(req.dealership);
  } catch (error) {
    res.status(500).send(error);
  }
});

// //dealership update
// router.patch("/update/:id", async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = [
//     "dealership_email",
//     "dealership_name",
//     "dealership_location",
//     "dealership_password",
//     "dealership_info",
//     "cars",
//     "deals",
//     "sold_vehicles",
//   ];

//   const isValidOperation = updates.every((update) => {
//     allowedUpdates.includes(update);
//   });

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid updates" });
//   }

//   try {
//     const dealership = await Dealership.findById(req.params.id);
//     updates.forEach((update) => (dealership[update] = req.body[update]));
//     await dealership.save();

//     if (!dealership) {
//       return res.status(404).send("Dealership not Found");
//     }

//     res.send(dealership);
//   } catch (error) {
//     res.status(400).json({ message: "Something went wrong: ", error });
//   }
// });

module.exports = router;
