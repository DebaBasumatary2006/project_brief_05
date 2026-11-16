const mongoose = require("mongoose");

const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error.code === 11000) {
    const duplicateField = Object.keys(error.keyPattern || error.keyValue || {})[0];
    const duplicateMessages = {
      email: "An account with this email already exists.",
      name: "A category with this name already exists.",
      sku: "A product with this SKU already exists.",
    };
    return res.status(409).json({
      success: false,
      message:
        duplicateMessages[duplicateField] ||
        "A record with this value already exists.",
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
