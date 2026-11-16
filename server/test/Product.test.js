const assert = require("node:assert/strict");
const test = require("node:test");

const Product = require("../models/Product");

const validProduct = {
  productName: "Laptop",
  sku: "LAP-001",
  category: "Electronics",
  supplier: "Office Supplies",
  purchasePrice: 500,
  sellingPrice: 650,
  quantity: 12,
  reorderLevel: 3,
  description: "Business laptop with 16 GB memory.",
};

test("Product model maps to products and applies its default", async () => {
  const product = new Product(validProduct);

  assert.equal(Product.modelName, "Product");
  assert.equal(Product.collection.name, "products");
  assert.equal(product.isActive, true);
  await product.validate();
});

test("Product requires the inventory entry fields", async () => {
  await assert.rejects(new Product().validate(), (error) => {
    for (const field of Object.keys(validProduct)) {
      assert.ok(error.errors[field], `${field} should be required`);
    }

    return true;
  });
});

test("Product validates SKU, pricing, whole-number stock, and description", async () => {
  const product = new Product({
    ...validProduct,
    sku: "LAP_001",
    sellingPrice: 400,
    quantity: 1.5,
    description: "Short",
  });

  await assert.rejects(product.validate(), (error) => {
    for (const field of ["sku", "sellingPrice", "quantity", "description"]) {
      assert.ok(error.errors[field], `${field} should reject invalid input`);
    }

    return true;
  });
});
