# Sprint 13: MongoDB Setup and Backend Database Connection

## Sprint Goal

Connect the Express backend to MongoDB through Mongoose using a private environment variable, and keep the Sprint 12 API available after the connection succeeds.

## Database Structure

The project uses the `inventory-management` database and its initial `products` collection:

- A **database** groups related application data.
- A **collection** groups documents for a module, such as products.
- A **document** is one BSON record in a collection, such as an individual product.

MongoDB creates the database and collection when needed. On startup, the backend creates the `products` collection if it does not already exist. Product CRUD remains in memory until a later sprint.

## Configuration and Startup

1. Install dependencies from `server/` with `npm install`.
2. Copy `server/.env.example` to `server/.env`.
3. Set `MONGODB_URI` to the local MongoDB or Atlas connection string. The example uses `mongodb://127.0.0.1:27017/inventory-management`.
4. Start the server from `server/` with `npm run dev`.

`server/config/database.js` owns the Mongoose connection. `server/server.js` loads the environment, waits for MongoDB, and then starts Express. A missing or invalid connection fails startup with an error instead of serving requests as if the database were connected. Logs show the database host and name, never the connection string.

The `.env` file is ignored by Git. Commit only the safe `.env.example`; never commit credentials or paste them into screenshots.

## Verification

- Start MongoDB before starting the backend.
- Confirm the terminal reports a successful database connection and then the API listening port.
- In MongoDB Compass, connect using the same URI and verify the `inventory-management` database and `products` collection.
- Exercise the Sprint 12 endpoints at `/api/products` and `/api/test`. The routes remain functional and product records remain in memory in this sprint.

## Sprint Scope

This sprint adds the MongoDB connection and initial collection only. Mongoose product schemas and database-backed CRUD are deferred to the next sprint. The React frontend is unchanged.
