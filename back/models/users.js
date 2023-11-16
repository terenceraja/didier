const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  creationDate: Date,
});

const Todo = mongoose.model("users", userSchema);

module.exports = Todo;
