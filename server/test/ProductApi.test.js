const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");

const app = require("../app");
const Product = require("../models/Product");

const products = new Map();
const originalMethods = {
  create: Product.create,
  find: Product.find,
  findById: Product.findById,
  findByIdAndDelete: Product.findByIdAndDelete,
  save: Product.prototype.save,
};

let server;
let baseUrl;

const validProduct = {
  productName: "Canvas Tote",
  sku: "BAG-101",
  category: "Accessories",
  supplier: "Local Supplier",
  purchasePrice: 8,
  sellingPrice: 15,
  quantity: 4,
  reorderLevel: 2,
  description: "Reusable canvas tote bag.",
};

before(async () => {
  Product.prototype.save = async function save() {
    await this.validate();

    const duplicateSku = [...products.entries()].some(
      ([id, product]) => id !== this._id.toString() && product.sku === this.sku,
    );
    if (duplicateSku) {
      throw Object.assign(new Error("Duplicate SKU"), { code: 11000 });
    }

    products.set(this._id.toString(), this);
    return this;
  };
  Product.create = async (data) => new Product(data).save();
  Product.find = async () => [...products.values()];
  Product.findById = async (id) => products.get(id) || null;
  Product.findByIdAndDelete = async (id) => {
    const product = products.get(id) || null;
    if (product) {
      products.delete(id);
    }
    return product;
  };

  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}/api/products`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
  Product.create = originalMethods.create;
  Product.find = originalMethods.find;
  Product.findById = originalMethods.findById;
  Product.findByIdAndDelete = originalMethods.findByIdAndDelete;
  Product.prototype.save = originalMethods.save;
});

test("Product API completes a database-model-backed CRUD lifecycle", async () => {
  const createResponse = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validProduct),
  });
  const created = await createResponse.json();

  assert.equal(createResponse.status, 201);
  assert.equal(created.success, true);
  assert.equal(created.data.sku, validProduct.sku);
  const productId = created.data._id;

  const listResponse = await fetch(baseUrl);
  const listed = await listResponse.json();
  assert.equal(listResponse.status, 200);
  assert.equal(listed.count, 1);
  assert.equal(listed.data[0]._id, productId);

  const getResponse = await fetch(`${baseUrl}/${productId}`);
  const fetched = await getResponse.json();
  assert.equal(getResponse.status, 200);
  assert.equal(fetched.data.productName, validProduct.productName);

  const updateResponse = await fetch(`${baseUrl}/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity: 9 }),
  });
  const updated = await updateResponse.json();
  assert.equal(updateResponse.status, 200);
  assert.equal(updated.data.quantity, 9);

  const deleteResponse = await fetch(`${baseUrl}/${productId}`, {
    method: "DELETE",
  });
  const deleted = await deleteResponse.json();
  assert.equal(deleteResponse.status, 200);
  assert.equal(deleted.data._id, productId);

  const missingResponse = await fetch(`${baseUrl}/${productId}`);
  assert.equal(missingResponse.status, 404);
});

test("Product API reports invalid requests and database failures safely", async () => {
  const invalidIdResponse = await fetch(`${baseUrl}/not-an-object-id`);
  assert.equal(invalidIdResponse.status, 400);

  const invalidJsonResponse = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{",
  });
  assert.equal(invalidJsonResponse.status, 400);

  const invalidProductResponse = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productName: "Missing required fields" }),
  });
  assert.equal(invalidProductResponse.status, 400);

  const emptyUpdateResponse = await fetch(
    `${baseUrl}/507f1f77bcf86cd799439011`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    },
  );
  assert.equal(emptyUpdateResponse.status, 400);

  const originalFind = Product.find;
  Product.find = async () => {
    throw new Error("Database unavailable");
  };
  const originalConsoleError = console.error;
  console.error = () => {};
  try {
    const databaseErrorResponse = await fetch(baseUrl);
    const databaseError = await databaseErrorResponse.json();
    assert.equal(databaseErrorResponse.status, 500);
    assert.equal(databaseError.message, "Internal server error.");
  } finally {
    Product.find = originalFind;
    console.error = originalConsoleError;
  }
});
