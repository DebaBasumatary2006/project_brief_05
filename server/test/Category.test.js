const assert = require("node:assert/strict");
const test = require("node:test");

const Category = require("../models/Category");

const validCategory = {
  name: "Electronics",
  description: "Electronic products and accessories.",
};

test("Category model maps to categories and applies its active default", async () => {
  const category = new Category(validCategory);

  assert.equal(Category.modelName, "Category");
  assert.equal(Category.collection.name, "categories");
  assert.equal(category.isActive, true);
  await category.validate();
});

test("Category requires a valid name and limits description length", async () => {
  await assert.rejects(new Category().validate(), (error) => {
    assert.ok(error.errors.name, "name should be required");
    return true;
  });

  const category = new Category({
    ...validCategory,
    name: "E",
    description: "x".repeat(251),
  });
  await assert.rejects(category.validate(), (error) => {
    assert.ok(error.errors.name, "short names should be rejected");
    assert.ok(error.errors.description, "long descriptions should be rejected");
    return true;
  });
});
