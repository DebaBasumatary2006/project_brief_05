const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required."],
      trim: true,
      minlength: [2, "Product name must contain at least 2 characters."],
    },
    sku: {
      type: String,
      required: [true, "SKU is required."],
      trim: true,
      match: [/^[A-Za-z0-9-]+$/, "SKU may contain letters, numbers, and hyphens only."],
      unique: true,
    },
    category: {
      type: String,
      required: [true, "Category is required."],
      trim: true,
    },
    supplier: {
      type: String,
      required: [true, "Supplier name is required."],
      trim: true,
    },
    purchasePrice: {
      type: Number,
      required: [true, "Purchase price is required."],
      min: [0.01, "Purchase price must be greater than 0."],
    },
    sellingPrice: {
      type: Number,
      required: [true, "Selling price is required."],
      min: [0.01, "Selling price must be greater than 0."],
      validate: {
        validator(value) {
          return this.purchasePrice == null || value >= this.purchasePrice;
        },
        message: "Selling price cannot be lower than the purchase price.",
      },
    },
    quantity: {
      type: Number,
      required: [true, "Stock quantity is required."],
      min: [0, "Quantity must be greater than or equal to 0."],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be a whole number.",
      },
    },
    reorderLevel: {
      type: Number,
      required: [true, "Reorder level is required."],
      min: [0, "Reorder level must be greater than or equal to 0."],
      validate: {
        validator: Number.isInteger,
        message: "Reorder level must be a whole number.",
      },
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long."],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "products",
    timestamps: true,
  },
);

module.exports = mongoose.model("Product", productSchema);
