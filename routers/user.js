const express = require("express");
const auth_user = require("../middleware/auth_user");
const User = require("../models/user.js");
const router = new express.Router();

//user register route
router.post("/register", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(500).send(e);
  }
});

//users login route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.user_email,
      req.body.user_password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

//user logout
router.post("/logout", auth_user, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

//user logoutAll
router.post("/logoutAll", auth_user, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    req.status(500).send(error);
  }
});

//users profile
router.get("/user_me", auth_user, async (req, res) => {
  res.send(req.user);
});

//users reading
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error: ", error });
  }
});

//user reading
router.get("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("User not Found");
    }
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error: ", error });
  }
});

// //user update
// router.patch("/update/:id", async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = [
//     "user_name",
//     "user_email",
//     "user_password",
//     "user_location",
//     "user_info",
//     "vehicle_info",
//   ];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid updates" });
//   }

//   try {
//     const user = await User.findById(req.params.id);
//     updates.forEach((update) => (user[update] = req.body[update]));
//     await user.save();

//     if (!user) {
//       return res.status(404).send("User not Found");
//     }

//     res.send(user);
//   } catch (error) {
//     res.status(400).json({ message: "Something went wrong: ", error });
//   }
// });

//user update
router.patch("/update/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "user_name",
    "user_email",
    "user_password",
    "user_location",
    "user_info",
    "vehicle_info",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("User not Found");
    }

    res.send(user);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong: ", error });
  }
});

//user delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
