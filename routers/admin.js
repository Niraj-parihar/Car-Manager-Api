const express = require("express");
const router = new express.Router();
const Admin = require("../models/admin");

//Admin login
router.post("/login", async (req, res) => {
  try {
    const { admin_id, password } = req.body;
    const admin = await Admin.findOne({ admin_id });
    if (!admin) {
      return res.status(401).json({ message: "Invalid admin ID" });
    }
    if (admin.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(" error during admin login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
