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
  const { email, name, surname } = req.body;
  let user = await User.findOne({ email: email });
  if (!user) {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
      name: name,
      surname: surname,
      email: email,
      password: hash,
    });
    const savedUser = await newUser.save();
    const token = jwt.sign({ userId: savedUser._id }, "secret");
    res.cookie("jwt", token, { maxAge: 3600000, httpOnly: true });

    res
      .status(200)
      .json({ message: "User is registered!", userId: savedUser._id });
  } else {
    res
      .status(201)
      .json({ error: "user check", message: "User already exists!" });
  }
});

router.post("/signIn", validateUserPayload(signInSchema), async (req, res) => {
  const { password, email } = req.body;
  let user = await User.findOne({ email: email });
  if (!user) {
    res.status(200).json({ error: "user check", message: "User not found" });
  } else {
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user._id, email: user.email }, "secret");

      res.json({
        message: "password is correct",
        userId: user._id,
        token: token,
      });
    } else {
      res.json({
        error: "password check",
        message: "password is incorrect",
      });
    }
  }
});

module.exports = router;
