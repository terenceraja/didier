const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  surname: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
});

module.exports = userSchema;
