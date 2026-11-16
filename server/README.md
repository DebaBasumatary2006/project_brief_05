# Inventory Management System API

## Setup

Install dependencies from this directory:

```bash
npm install
```

Copy `.env.example` to `.env` before starting the server. Set `MONGODB_URI` to your MongoDB connection string; the example points to a local MongoDB Community Server. Keep `.env` private and never commit it. The server requires MongoDB to be available before it starts listening.

The backend connects to the `inventory-management` database and creates the `products` and `categories` collections if they do not exist. Product and category CRUD use separate Mongoose models and persist records in MongoDB.

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

The MongoDB-backed CRUD endpoints are mounted at `/api/products`:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/products` | Create a product; returns `201` |
| `GET` | `/api/products` | List products; returns `200` and a count |
| `GET` | `/api/products/:id` | Retrieve one product |
| `PUT` | `/api/products/:id` | Update supplied product fields and return the validated record |
| `DELETE` | `/api/products/:id` | Delete a product and return the deleted record |

Invalid IDs and model validation errors return `400`; missing products return `404`; duplicate SKUs return `409`; unexpected database errors return a generic `500` response. Import `postman/Sprint15-Product-API.postman_collection.json`, set its `baseUrl` variable, and run requests in order to exercise the CRUD lifecycle.

## Category API

The category CRUD endpoints are mounted at `/api/categories`:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/categories` | Create a category; returns `201` |
| `GET` | `/api/categories` | List categories; returns `200` and a count |
| `GET` | `/api/categories/:id` | Retrieve one category |
| `PUT` | `/api/categories/:id` | Update supplied category fields |
| `DELETE` | `/api/categories/:id` | Delete a category |

Category names must be unique; duplicate names return `409`. Invalid IDs and model validation errors return `400`, missing categories return `404`, and unexpected database errors return a generic `500` response. Import `postman/Sprint17-Category-API.postman_collection.json`, set `baseUrl`, and run requests in order to exercise the category CRUD lifecycle.

## Structure

```text
server/
├── config/
│   └── database.js
├── controllers/
│   ├── categoryController.js
│   ├── productController.js
│   └── testController.js
├── middleware/
│   ├── errorHandler.js
│   └── requestLogger.js
├── models/
│   ├── Category.js
│   └── Product.js
├── postman/
│   ├── Sprint17-Category-API.postman_collection.json
│   ├── Sprint15-Product-API.postman_collection.json
│   └── Sprint12-Product-API.postman_collection.json
├── public/
├── routes/
│   ├── categoryRoutes.js
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

`app.js` configures Express middleware, mounts the Product and Category routes, and maps request/model errors to JSON responses. `server.js` loads environment variables, connects to MongoDB, and only then starts listening.

## Product Model

Sprint 14 defines the Mongoose Product schema and model in `models/Product.js`, mapped to the `products` collection. Run `npm test` from this directory to verify model validation and the API CRUD/error behavior. Sprint 15 implementation notes are in [`../docs/sprint-15-mongodb-product-crud.md`](../docs/sprint-15-mongodb-product-crud.md).
