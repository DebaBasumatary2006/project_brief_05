const mongoose = require("mongoose");
const Category = require("../models/Category");
const Product = require("../models/Product");

const COLLECTION_NAMES = [Product.collection.name, Category.collection.name];

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is required to start the server.");
  }

  const connection = await mongoose.connect(uri);
  console.log(
    `MongoDB connected successfully: ${connection.connection.host}/${connection.connection.name}`,
  );

  for (const collectionName of COLLECTION_NAMES) {
    const collections = await connection.connection.db
      .listCollections({ name: collectionName }, { nameOnly: true })
      .toArray();

    if (collections.length === 0) {
      await connection.connection.db.createCollection(collectionName);
      console.log(`MongoDB collection "${collectionName}" created.`);
    }
  }

  return connection;
};

module.exports = connectDB;
