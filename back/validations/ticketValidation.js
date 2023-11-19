const Joi = require("joi");

const ticketSchema = Joi.object({
  title: Joi.alphanum().max(50).required(),
  ticketNumber: Joi.number().integer().positive().max(999999).required(),
  userId: Joi.string().email().required(),
  problem: Joi.string().required(),
  priority: Joi.string().required(),
  status: Joi.string().alphanum().required(),
});

module.exports = ticketSchema;
