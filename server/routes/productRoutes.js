const express = require("express");
const {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", listProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
