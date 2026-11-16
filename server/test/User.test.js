const assert = require("node:assert/strict");
const { test } = require("node:test");

const User = require("../models/User");

test("User model normalizes unique emails and keeps passwords out of default queries", async () => {
  const user = new User({
    name: "  Rahul Sharma  ",
    email: "  RAHUL@EXAMPLE.COM ",
    password: "a-bcrypt-hash",
  });

  await user.validate();

  assert.equal(User.collection.name, "users");
  assert.equal(user.name, "Rahul Sharma");
  assert.equal(user.email, "rahul@example.com");
  assert.equal(User.schema.path("email").options.unique, true);
  assert.equal(User.schema.path("password").options.select, false);
  assert.equal(User.schema.options.timestamps, true);
});

test("User model requires name, email, and password", async () => {
  const user = new User({});

  await assert.rejects(user.validate(), (error) => {
    assert.equal(error.name, "ValidationError");
    assert.ok(error.errors.name);
    assert.ok(error.errors.email);
    assert.ok(error.errors.password);
    return true;
  });
});
