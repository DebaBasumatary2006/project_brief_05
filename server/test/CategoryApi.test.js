const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");

const app = require("../app");
const Category = require("../models/Category");

const categories = new Map();
const originalMethods = {
  create: Category.create,
  find: Category.find,
  findById: Category.findById,
  findByIdAndDelete: Category.findByIdAndDelete,
  save: Category.prototype.save,
};

let server;
let baseUrl;

const validCategory = {
  name: "Office Supplies",
  description: "Paper, pens, and other office essentials.",
};

before(async () => {
  Category.prototype.save = async function save() {
    await this.validate();

    const duplicateName = [...categories.entries()].some(
      ([id, category]) =>
        id !== this._id.toString() && category.name === this.name,
    );
    if (duplicateName) {
      throw Object.assign(new Error("Duplicate category"), {
        code: 11000,
        keyPattern: { name: 1 },
      });
    }

    categories.set(this._id.toString(), this);
    return this;
  };
  Category.create = async (data) => new Category(data).save();
  Category.find = async () => [...categories.values()];
  Category.findById = async (id) => categories.get(id) || null;
  Category.findByIdAndDelete = async (id) => {
    const category = categories.get(id) || null;
    if (category) {
      categories.delete(id);
    }
    return category;
  };

  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}/api/categories`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
  Category.create = originalMethods.create;
  Category.find = originalMethods.find;
  Category.findById = originalMethods.findById;
  Category.findByIdAndDelete = originalMethods.findByIdAndDelete;
  Category.prototype.save = originalMethods.save;
});

test("Category API completes a CRUD lifecycle independently", async () => {
  const createResponse = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validCategory),
  });
  const created = await createResponse.json();

  assert.equal(createResponse.status, 201);
  assert.equal(created.success, true);
  assert.equal(created.data.name, validCategory.name);
  const categoryId = created.data._id;

  const listResponse = await fetch(baseUrl);
  const listed = await listResponse.json();
  assert.equal(listResponse.status, 200);
  assert.equal(listed.count, 1);
  assert.equal(listed.data[0]._id, categoryId);

  const getResponse = await fetch(`${baseUrl}/${categoryId}`);
  const fetched = await getResponse.json();
  assert.equal(getResponse.status, 200);
  assert.equal(fetched.data.description, validCategory.description);

  const updateResponse = await fetch(`${baseUrl}/${categoryId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description: "Office products and supplies." }),
  });
  const updated = await updateResponse.json();
  assert.equal(updateResponse.status, 200);
  assert.equal(updated.data.description, "Office products and supplies.");

  const deleteResponse = await fetch(`${baseUrl}/${categoryId}`, {
    method: "DELETE",
  });
  const deleted = await deleteResponse.json();
  assert.equal(deleteResponse.status, 200);
  assert.equal(deleted.data._id, categoryId);

  const missingResponse = await fetch(`${baseUrl}/${categoryId}`);
  assert.equal(missingResponse.status, 404);
});

test("Category API rejects invalid fields and duplicate names", async () => {
  const createResponse = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validCategory),
  });
  const created = await createResponse.json();
  const categoryId = created.data._id;

  const duplicateResponse = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validCategory),
  });
  const duplicate = await duplicateResponse.json();
  assert.equal(duplicateResponse.status, 409);
  assert.equal(duplicate.message, "A category with this name already exists.");

  const invalidIdResponse = await fetch(`${baseUrl}/not-an-object-id`);
  assert.equal(invalidIdResponse.status, 400);

  const emptyUpdateResponse = await fetch(`${baseUrl}/${categoryId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  assert.equal(emptyUpdateResponse.status, 400);

  const unsupportedFieldResponse = await fetch(`${baseUrl}/${categoryId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ unknown: true }),
  });
  assert.equal(unsupportedFieldResponse.status, 400);

  const originalFind = Category.find;
  Category.find = async () => {
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
    Category.find = originalFind;
    console.error = originalConsoleError;
  }
});
