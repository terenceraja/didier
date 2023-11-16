const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  title: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  surname: String,
  creationDate: Date,
  problem: String,
  priority: String,
  status: String,
});

const Todo = mongoose.model("tickets", ticketSchema);

module.exports = Todo;
