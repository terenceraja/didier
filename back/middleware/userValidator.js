const validateUserPayload = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      console.error("User validation error:", error);
      res
        .status(400)
        .json({ error: "Validation failed", message: error.message });
    }
  };
};

module.exports = validateUserPayload;
