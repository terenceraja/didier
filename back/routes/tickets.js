var express = require("express");
var router = express.Router();
require("../models/connection");
const ticketSchema = require("../validations/ticketValidation.js");

const Ticket = require("../models/tickets");
const validateTicketPayload = require("../middleware/ticketValidator.js");

const GenerateNumber = require("../utils/GenerateNumber");

// Create Ticket
router.post(
  "/create/:userId",
  validateTicketPayload(ticketSchema),
  async (req, res) => {
    try {
      let ticketNumber = GenerateNumber();

      const newTicket = new Ticket({
        title: req.body.title,
        ticketNumber: ticketNumber,
        userId: req.params.userId,
        problem: req.body.problem,
        priority: req.body.priority,
      });
      const savedTicket = await newTicket.save();
      res.status(200).json({
        message: "Ticket is registered!",
        data: savedTicket,
        status: true,
      });
    } catch (error) {
      res.status(400).json({
        error: error,
        message: "Something went wrong",
        status: false,
      });
    }
  }
);

router.get("/allTickets/:userId", async (req, res) => {
  console.log(req.params.userId);
  const mongoResponse = await Ticket.find({ userId: req.params.userId });
  res.status(200).json({
    message: "all tickets",
    data: mongoResponse,
    status: true,
  });
});

module.exports = router;
