const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  creationDate: { type: Date, default: Date.now },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
