const validateUserPayload = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      res
        .status(400)
        .json({ error: "User validation failed", message: error.message });
    }
  };
};

module.exports = validateUserPayload;
