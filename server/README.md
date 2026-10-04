# Inventory Management System API

## Setup

Install dependencies from this directory:

```bash
npm install
```

Copy `.env.example` to `.env` if you need to change the port or prepare the MongoDB URI for a later sprint. The current Sprint 11 server does not require MongoDB to start.

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
│   └── db.js
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

`app.js` configures Express middleware and mounts routes. `server.js` starts listening. The database connection helper is present for later integration and is not invoked by this foundation server.
