const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const productRoutes = require("./routes/productRoutes");
const requestLogger = require("./middleware/requestLogger");
const testRoutes = require("./routes/testRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Inventory Management System API is running.",
  });
});

app.use("/api", testRoutes);
app.use("/api/products", productRoutes);

module.exports = app;
