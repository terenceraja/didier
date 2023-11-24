var express = require("express");
var router = express.Router();
require("../models/connection");
const {
  createTicketSchema,
  updateTicketSchema,
} = require("../validations/ticketValidation.js");

const Ticket = require("../models/tickets");
const validateTicketPayload = require("../middleware/ticketValidator.js");
const GenerateNumber = require("../utils/GenerateNumber");

// Create Ticket
router.post(
  "/create/:userId",
  validateTicketPayload(createTicketSchema),
  async (req, res) => {
    try {
      let ticketNumber = GenerateNumber();
      const { title, problem, priority } = req.body;
      const { userId } = req.params;

      const newTicket = new Ticket({
        title: title,
        ticketNumber: ticketNumber,
        userId: userId,
        problem: problem,
        priority: priority,
      });
      const savedTicket = await newTicket.save();
      res.status(200).json({
        message: "Ticket is registered!",
        data: savedTicket,
      });
    } catch (err) {
      res.status(400).json({
        error: err,
        message: "Something went wrong",
      });
    }
  }
);

router.get("/allTickets", async (req, res) => {
  const tickets = await Ticket.find().populate("userId");
  res.status(200).json({
    message: "all tickets",
    data: tickets,
  });
});

router.put(
  "/update",
  validateTicketPayload(updateTicketSchema),
  async (req, res) => {
    const { ticketNumber, status, priority } = req.body;

    try {
      const updatedTicket = await Ticket.updateOne(
        { ticketNumber: ticketNumber },
        {
          $set: {
            status: status,
            priority: priority,
          },
        }
      );

      res.status(200).json({
        message: "Ticket Updated !",
        data: updatedTicket,
        status: true,
      });
    } catch (error) {
      res.status(400).json({
        error: error,
        message: "Something went wrong",
      });
    }
  }
);
module.exports = router;
