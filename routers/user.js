const express = require("express");
const User = require("../models/user.js");
const router = new express.Router();

//post is for the creation of collection
router.post("/register", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//users login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.user_email,
      req.body.user_password
    );
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
