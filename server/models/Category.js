const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required."],
      trim: true,
      minlength: [2, "Category name must contain at least 2 characters."],
      maxlength: [60, "Category name cannot exceed 60 characters."],
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [250, "Category description cannot exceed 250 characters."],
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "categories",
    timestamps: true,
  },
);

module.exports = mongoose.model("Category", categorySchema);
