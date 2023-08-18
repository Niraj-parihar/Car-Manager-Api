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

module.exports = router;
