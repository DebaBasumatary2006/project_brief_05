const mongoose = require("mongoose");

const COLLECTION_NAME = "products";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is required to start the server.");
  }

  const connection = await mongoose.connect(uri);
  console.log(
    `MongoDB connected successfully: ${connection.connection.host}/${connection.connection.name}`,
  );

  const collections = await connection.connection.db
    .listCollections({ name: COLLECTION_NAME }, { nameOnly: true })
    .toArray();

  if (collections.length === 0) {
    await connection.connection.db.createCollection(COLLECTION_NAME);
    console.log(`MongoDB collection "${COLLECTION_NAME}" created.`);
  }

  return connection;
};

module.exports = connectDB;
