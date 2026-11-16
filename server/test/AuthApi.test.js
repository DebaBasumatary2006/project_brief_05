const assert = require("node:assert/strict");
const bcrypt = require("bcryptjs");
const { after, before, beforeEach, test } = require("node:test");

const app = require("../app");
const User = require("../models/User");

const users = new Map();
const originalMethods = {
  create: User.create,
  findOne: User.findOne,
};

let server;
let baseUrl;

const validRegistration = {
  name: "Rahul Sharma",
  email: "Rahul@example.com",
  password: "Student@123",
};

before(async () => {
  User.findOne = (query) => {
    const user = users.get(query.email) || null;
    return {
      select: async () => user,
      then: (resolve, reject) => Promise.resolve(user).then(resolve, reject),
    };
  };
  User.create = async (data) => {
    const user = new User(data);
    await user.validate();

    if (users.has(user.email)) {
      throw Object.assign(new Error("Duplicate email"), {
        code: 11000,
        keyPattern: { email: 1 },
      });
    }

    user.createdAt = new Date();
    user.updatedAt = user.createdAt;
    users.set(user.email, user);
    return user;
  };

  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}/api/auth`;
});

beforeEach(() => {
  users.clear();
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
  User.create = originalMethods.create;
  User.findOne = originalMethods.findOne;
});

test("registration stores a bcrypt hash and login accepts the matching password", async () => {
  const registerResponse = await fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validRegistration),
  });
  const registered = await registerResponse.json();
  const savedUser = users.get("rahul@example.com");

  assert.equal(registerResponse.status, 201);
  assert.equal(registered.success, true);
  assert.equal(registered.data.email, "rahul@example.com");
  assert.equal("password" in registered.data, false);
  assert.notEqual(savedUser.password, validRegistration.password);
  assert.equal(await bcrypt.compare(validRegistration.password, savedUser.password), true);

  const loginResponse = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "RAHUL@example.com",
      password: validRegistration.password,
    }),
  });
  const loggedIn = await loginResponse.json();

  assert.equal(loginResponse.status, 200);
  assert.equal(loggedIn.success, true);
  assert.equal(loggedIn.data.email, "rahul@example.com");
  assert.equal("password" in loggedIn.data, false);
});

test("registration rejects duplicate emails and login hides which credential failed", async () => {
  await fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validRegistration),
  });

  const duplicateResponse = await fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...validRegistration,
      email: "  RAHUL@example.com ",
    }),
  });
  const duplicate = await duplicateResponse.json();
  assert.equal(duplicateResponse.status, 409);
  assert.equal(duplicate.message, "An account with this email already exists.");

  const wrongPasswordResponse = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: validRegistration.email, password: "wrongpass" }),
  });
  const wrongPassword = await wrongPasswordResponse.json();

  const unknownEmailResponse = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "unknown@example.com", password: "wrongpass" }),
  });
  const unknownEmail = await unknownEmailResponse.json();

  assert.equal(wrongPasswordResponse.status, 401);
  assert.equal(unknownEmailResponse.status, 401);
  assert.equal(wrongPassword.message, unknownEmail.message);
});

test("authentication endpoints validate required fields and password length", async () => {
  const invalidRegistrations = [
    { ...validRegistration, name: " " },
    { ...validRegistration, email: "not-an-email" },
    { ...validRegistration, password: "short" },
  ];

  for (const body of invalidRegistrations) {
    const response = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(response.status, 400);
  }

  const missingLoginFields = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "rahul@example.com" }),
  });
  assert.equal(missingLoginFields.status, 400);
});

test("duplicate-key race returns the authentication-specific conflict message", async () => {
  const originalCreate = User.create;
  User.create = async () => {
    throw Object.assign(new Error("Duplicate email"), {
      code: 11000,
      keyPattern: { email: 1 },
    });
  };

  try {
    const response = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validRegistration),
    });
    const result = await response.json();

    assert.equal(response.status, 409);
    assert.equal(result.message, "An account with this email already exists.");
  } finally {
    User.create = originalCreate;
  }
});
