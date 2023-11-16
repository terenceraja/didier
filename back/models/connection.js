const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://terenceraja:Slibidash0632@cluster0.jzxnhfi.mongodb.net/didier";

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
