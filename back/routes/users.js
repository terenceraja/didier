var express = require("express");
var router = express.Router();
require("../models/connection");
const ticketSchema = require("../validations/userValidation.js");
const User = require("../models/users");
const validateUserPayload = require("../middleware/userValidator.js");

// Create User
router.post("/create", validateUserPayload(ticketSchema), async (req, res) => {
  let mongoResponse = await User.findOne({ email: response.email });
  if (mongoResponse === null) {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(200).json({ message: "User is registered!", data: savedUser });
  } else {
    res
      .status(200)
      .json({ error: "Data base check", message: "User already exists!" });
  }
});

module.exports = router;
