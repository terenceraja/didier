const validateTicketPayload = (schema) => {
  return async (req, res, next) => {
    console.log(req.body);
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      res
        .status(400)
        .json({ error: "Ticket validation failed", message: error.message });
    }
  };
};

module.exports = validateTicketPayload;
