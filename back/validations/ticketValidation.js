const Joi = require("joi");

const ticketSchema = Joi.object({
  title: Joi.string().alphanum().max(50).required(),
  problem: Joi.string().required(),
  priority: Joi.string().required(),
});

module.exports = ticketSchema;
