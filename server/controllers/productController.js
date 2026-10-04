let products = [];
let nextProductId = 1;

const listProducts = (req, res) => {
  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
};

const getProductById = (req, res) => {
  const product = products.find((item) => item.id === req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product ${req.params.id} was not found.`,
    });
  }

  return res.status(200).json({ success: true, data: product });
};

const createProduct = (req, res) => {
  const { productName, sku } = req.body || {};

  if (
    typeof productName !== "string" ||
    !productName.trim() ||
    typeof sku !== "string" ||
    !sku.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Product name and SKU are required.",
    });
  }

  const product = {
    ...req.body,
    id: String(nextProductId++),
    productName: productName.trim(),
    sku: sku.trim(),
  };

  products.push(product);
  return res.status(201).json({ success: true, data: product });
};

const updateProduct = (req, res) => {
  const productIndex = products.findIndex((item) => item.id === req.params.id);

  if (productIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Product ${req.params.id} was not found.`,
    });
  }

  const currentProduct = products[productIndex];
  const updatedProduct = { ...currentProduct, ...(req.body || {}), id: currentProduct.id };

  if (typeof updatedProduct.productName !== "string" || !updatedProduct.productName.trim()) {
    return res.status(400).json({ success: false, message: "Product name cannot be empty." });
  }

  if (typeof updatedProduct.sku !== "string" || !updatedProduct.sku.trim()) {
    return res.status(400).json({ success: false, message: "SKU cannot be empty." });
  }

  updatedProduct.productName = updatedProduct.productName.trim();
  updatedProduct.sku = updatedProduct.sku.trim();
  products[productIndex] = updatedProduct;

  return res.status(200).json({ success: true, data: updatedProduct });
};

const deleteProduct = (req, res) => {
  const productIndex = products.findIndex((item) => item.id === req.params.id);

  if (productIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Product ${req.params.id} was not found.`,
    });
  }

  const [deletedProduct] = products.splice(productIndex, 1);
  return res.status(200).json({ success: true, data: deletedProduct });
};

module.exports = {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
};
