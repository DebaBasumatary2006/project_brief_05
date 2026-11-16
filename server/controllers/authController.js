const bcrypt = require("bcryptjs");
const User = require("../models/User");

const PASSWORD_SALT_ROUNDS = 10;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isRequestObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const publicUser = (user) => ({
  _id: user._id.toString(),
  name: user.name,
  email: user.email,
});

const registerUser = async (req, res) => {
  if (!isRequestObject(req.body)) {
    return res.status(400).json({
      success: false,
      message: "A registration object is required in the request body.",
    });
  }

  const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
  const email =
    typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password =
    typeof req.body.password === "string" ? req.body.password : "";

  if (name.length < 2 || name.length > 60) {
    return res.status(400).json({
      success: false,
      message: "Name must contain between 2 and 60 characters.",
    });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({
      success: false,
      message: "A valid email address is required.",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must contain at least 8 characters.",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "An account with this email already exists.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
  const user = await User.create({ name, email, password: hashedPassword });

  return res.status(201).json({
    success: true,
    message: "Account created successfully.",
    data: publicUser(user),
  });
};

const loginUser = async (req, res) => {
  if (!isRequestObject(req.body)) {
    return res.status(400).json({
      success: false,
      message: "A login object is required in the request body.",
    });
  }

  const email =
    typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password =
    typeof req.body.password === "string" ? req.body.password : "";

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({
      success: false,
      message: "A valid email address is required.",
    });
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Login successful.",
    data: publicUser(user),
  });
};

module.exports = { loginUser, registerUser };
