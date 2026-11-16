const mongoose = require("mongoose");
const Product = require("../models/Product");

const editableFields = new Set(
  Object.keys(Product.schema.paths).filter(
    (field) => !["_id", "__v", "createdAt", "updatedAt"].includes(field),
  ),
);

const isRequestObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const validateProductId = (id, res) => {
  if (mongoose.isObjectIdOrHexString(id)) {
    return true;
  }

  res.status(400).json({ success: false, message: "Invalid product ID." });
  return false;
};

const listProducts = async (req, res) => {
  const products = await Product.find();
  return res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
};

const getProductById = async (req, res) => {
  if (!validateProductId(req.params.id, res)) {
    return;
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product ${req.params.id} was not found.`,
    });
  }

  return res.status(200).json({ success: true, data: product });
};

const createProduct = async (req, res) => {
  if (!isRequestObject(req.body)) {
    return res.status(400).json({
      success: false,
      message: "A product object is required in the request body.",
    });
  }

  const product = await Product.create(req.body);
  return res.status(201).json({
    success: true,
    message: "Product created successfully.",
    data: product,
  });
};

const updateProduct = async (req, res) => {
  if (!validateProductId(req.params.id, res)) {
    return;
  }

  if (!isRequestObject(req.body) || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Updated product fields are required in the request body.",
    });
  }

  const unsupportedFields = Object.keys(req.body).filter(
    (field) => !editableFields.has(field),
  );
  if (unsupportedFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Unsupported product field(s): ${unsupportedFields.join(", ")}.`,
    });
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product ${req.params.id} was not found.`,
    });
  }

  product.set(req.body);
  const updatedProduct = await product.save();
  return res.status(200).json({ success: true, data: updatedProduct });
};

const deleteProduct = async (req, res) => {
  if (!validateProductId(req.params.id, res)) {
    return;
  }

  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product ${req.params.id} was not found.`,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully.",
    data: product,
  });
};

module.exports = {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
};
