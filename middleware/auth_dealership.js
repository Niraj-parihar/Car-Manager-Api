const jwt = require("jsonwebtoken");
const Dealership = require("../models/dealership");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisiscarapi");
    const dealership = await Dealership.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!dealership) {
      throw new Error();
    }
    req.token = token;
    req.dealership = dealership;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate first." });
  }
};

module.exports = auth;
