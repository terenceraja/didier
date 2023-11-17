var express = require("express");
var router = express.Router();
require("../models/connection");
const userSchema = require("../validations/userValidation.js");
const User = require("../models/users");

// Create User
router.post("/create", async (req, res) => {
  try {
    let response = await userSchema.validateAsync(req.body);

    let mongoResponse = await User.findOne({ email: response.email });

    if (mongoResponse === null) {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.status(200).json({ message: "User is registered!", data: savedUser });
    } else {
      res.json({ message: "User already exists!" });
    }
  } catch (error) {
    console.error("User validation error:", error);
    res
      .status(400)
      .json({ error: "Validation failed", message: error.message });
  }
});

module.exports = router;
