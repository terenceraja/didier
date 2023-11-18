const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  title: String,
  ticketNumber: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  surname: String,
  creationDate: String,
  problem: String,
  priority: String,
  status: String,
});

const Todo = mongoose.model("tickets", ticketSchema);

module.exports = Todo;
