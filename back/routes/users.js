var express = require("express");
var router = express.Router();
require("../models/connection");
const {
  signInSchema,
  signUpSchema,
} = require("../validations/userValidation.js");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const validateUserPayload = require("../middleware/userValidator.js");

// Create User
router.post("/signUp", validateUserPayload(signUpSchema), async (req, res) => {
  let mongoResponse = await User.findOne({ email: req.body.email });
  if (mongoResponse === null) {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: hash,
    });
    const savedUser = await newUser.save();
    res.status(200).json({ message: "User is registered!", data: savedUser });
  } else {
    res
      .status(200)
      .json({ error: "Data base check", message: "User already exists!" });
  }
});

router.post("/signIn", validateUserPayload(signInSchema), async (req, res) => {
  let mongoResponse = await User.findOne({ email: req.body.email });
  if (mongoResponse === null) {
    res
      .status(200)
      .json({ error: "user check", message: "User not found", status: false });
  } else {
    if (bcrypt.compareSync(req.body.password, mongoResponse.password)) {
      const token = jwt.sign(
        { id: mongoResponse._Id, email: mongoResponse.email },
        "secret"
      );

      res.json({
        message: "password is correct",
        status: true,
        data: mongoResponse,
        token: token,
      });
    } else {
      res.json({
        error: "password check",
        message: "password is incorrect",
        status: false,
      });
    }
  }
});

module.exports = router;
