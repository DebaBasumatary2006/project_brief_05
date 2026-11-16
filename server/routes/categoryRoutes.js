const express = require("express");
const {
  createCategory,
  deleteCategory,
  getCategoryById,
  listCategories,
  updateCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.get("/", listCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
