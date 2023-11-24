var express = require("express");
var path = require("path");
const cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
require("./models/connection");

var ticketsRouter = require("./routes/tickets");
var usersRouter = require("./routes/users");

var app = express();
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/tickets", ticketsRouter);
app.use("/users", usersRouter);

module.exports = app;
