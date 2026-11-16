const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");
const requestLogger = require("./middleware/requestLogger");
const testRoutes = require("./routes/testRoutes");

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
app.use(errorHandler);

module.exports = app;
