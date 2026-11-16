# Inventory Management System API

## Setup

Install dependencies from this directory:

```bash
npm install
```

Copy `.env.example` to `.env` before starting the server. Set `MONGODB_URI` to your MongoDB connection string; the example points to a local MongoDB Community Server. Keep `.env` private and never commit it. The server requires MongoDB to be available before it starts listening.

The backend connects to the `inventory-management` database and creates the initial `products` collection if it does not exist. Sprint 12 product routes still use in-memory data; database CRUD is not part of this sprint.

## Run

Start the API normally:

```bash
npm start
```

Start with automatic restarts during development:

```bash
npm run dev
```

The default server URL is `http://localhost:5000`. Override the port with `PORT` in `.env`.

## Health Checks

- `GET /` returns API status.
- `GET /api/test` returns backend status and a timestamp.

## Product API

Sprint 12 provides in-memory CRUD endpoints at `/api/products`:

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (requires `productName` and `sku`)
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

Records are temporary and reset when the server restarts; these routes do not use MongoDB. The `requestLogger` middleware logs the method, URL, and timestamp, then calls `next()`.

Import `postman/Sprint12-Product-API.postman_collection.json` to test the request sequence. Set its `baseUrl` collection variable to the port used by the server.

## Structure

```text
server/
├── config/
│   └── database.js
├── controllers/
│   ├── productController.js
│   └── testController.js
├── middleware/
│   └── requestLogger.js
├── models/
├── postman/
│   └── Sprint12-Product-API.postman_collection.json
├── public/
├── routes/
│   ├── productRoutes.js
│   └── testRoutes.js
├── services/
├── uploads/
├── utils/
├── app.js
├── server.js
├── README.md
├── package.json
├── package-lock.json
└── .env.example
```

`app.js` configures Express middleware and mounts routes. `server.js` loads environment variables, connects to MongoDB, and only then starts listening.
