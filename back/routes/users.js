var express = require("express");
var router = express.Router();
require("../models/connection");

const User = require("../models/users");

// Create User
router.post("/create", (req, res) => {
  res.json({ message: req.body });
});

module.exports = router;
