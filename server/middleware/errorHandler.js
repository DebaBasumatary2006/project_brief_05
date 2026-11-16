const mongoose = require("mongoose");

const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "A product with this SKU already exists.",
    });
  }

  if (
    error instanceof mongoose.Error.ValidationError ||
    error instanceof mongoose.Error.CastError
  ) {
    return res.status(400).json({ success: false, message: error.message });
  }

  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      message: "Request body must be valid JSON.",
    });
  }

  if (error.status === 413) {
    return res.status(413).json({
      success: false,
      message: "Request body is too large.",
    });
  }

  console.error("API request failed:", error);
  return res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
};

module.exports = errorHandler;
