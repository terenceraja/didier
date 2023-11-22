const Joi = require("joi");

const createTicketSchema = Joi.object({
  title: Joi.string().alphanum().max(50).required(),
  problem: Joi.string().required(),
  priority: Joi.string().required(),
});

const updateTicketSchema = Joi.object({
  title: Joi.string().alphanum().max(50).required(),

  priority: Joi.string().required(),
  status: Joi.string().required(),
  ticketNumber: Joi.number().required(),
});

module.exports = { createTicketSchema, updateTicketSchema };
