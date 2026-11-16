const mongoose = require("mongoose");
const Category = require("../models/Category");

const editableFields = new Set(
  Object.keys(Category.schema.paths).filter(
    (field) => !["_id", "__v", "createdAt", "updatedAt"].includes(field),
  ),
);

const isRequestObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const validateCategoryId = (id, res) => {
  if (mongoose.isObjectIdOrHexString(id)) {
    return true;
  }

  res.status(400).json({ success: false, message: "Invalid category ID." });
  return false;
};

const listCategories = async (req, res) => {
  const categories = await Category.find();
  return res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
};

const getCategoryById = async (req, res) => {
  if (!validateCategoryId(req.params.id, res)) {
    return;
  }

  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({
      success: false,
      message: `Category ${req.params.id} was not found.`,
    });
  }

  return res.status(200).json({ success: true, data: category });
};

const createCategory = async (req, res) => {
  if (!isRequestObject(req.body)) {
    return res.status(400).json({
      success: false,
      message: "A category object is required in the request body.",
    });
  }

  const category = await Category.create(req.body);
  return res.status(201).json({
    success: true,
    message: "Category created successfully.",
    data: category,
  });
};

const updateCategory = async (req, res) => {
  if (!validateCategoryId(req.params.id, res)) {
    return;
  }

  if (!isRequestObject(req.body) || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Updated category fields are required in the request body.",
    });
  }

  const unsupportedFields = Object.keys(req.body).filter(
    (field) => !editableFields.has(field),
  );
  if (unsupportedFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Unsupported category field(s): ${unsupportedFields.join(", ")}.`,
    });
  }

  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({
      success: false,
      message: `Category ${req.params.id} was not found.`,
    });
  }

  category.set(req.body);
  const updatedCategory = await category.save();
  return res.status(200).json({ success: true, data: updatedCategory });
};

const deleteCategory = async (req, res) => {
  if (!validateCategoryId(req.params.id, res)) {
    return;
  }

  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({
      success: false,
      message: `Category ${req.params.id} was not found.`,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Category deleted successfully.",
    data: category,
  });
};

module.exports = {
  createCategory,
  deleteCategory,
  getCategoryById,
  listCategories,
  updateCategory,
};
