require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/database");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer().catch(async (error) => {
  console.error("Server startup failed:", error.message);
  await mongoose.disconnect();
  process.exitCode = 1;
});
