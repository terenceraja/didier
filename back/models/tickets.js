const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  title: String,
  ticketNumber: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  surname: String,
  creationDate: { type: Date, default: Date.now },
  problem: String,
  priority: String,
  status: { type: String, default: "open" },
});

const Todo = mongoose.model("tickets", ticketSchema);

module.exports = Todo;
