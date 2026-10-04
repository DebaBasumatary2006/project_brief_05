# Sprint 12: Express Routing and Middleware

## Sprint Goal
Create a project-specific REST route, delegate request handling to a controller, and log incoming requests through middleware before continuing with `next()`.

## Request Flow
```text
Client -> Express app -> requestLogger -> productRoutes -> productController -> JSON response
```

## Product API
Base path: `/api/products`

| Method | Path | Behavior | Success status |
| --- | --- | --- | --- |
| GET | `/api/products` | List in-memory products | 200 |
| GET | `/api/products/:id` | Read one product by ID | 200 |
| POST | `/api/products` | Create product; requires `productName` and `sku` | 201 |
| PUT | `/api/products/:id` | Update an existing product | 200 |
| DELETE | `/api/products/:id` | Delete an existing product | 200 |

Missing products return 404. A create request without a product name or SKU returns 400. Product records are stored in memory for this routing exercise; data resets when the server restarts. The routes do not use MongoDB.

## Structure
```text
server/
├── controllers/
│   ├── productController.js
│   └── testController.js
├── middleware/
│   └── requestLogger.js
├── routes/
│   ├── productRoutes.js
│   └── testRoutes.js
├── app.js
└── server.js
```

`productRoutes.js` maps HTTP methods and URL paths to controller functions. `productController.js` creates JSON responses and handles temporary in-memory product data. `requestLogger.js` writes the method, original URL, and ISO timestamp, then calls `next()` so the request continues.

## Test the API
Run the backend from `server/`:
```bash
npm run dev
```

The API defaults to port 5000. Import [`server/postman/Sprint12-Product-API.postman_collection.json`](../server/postman/Sprint12-Product-API.postman_collection.json) into Postman and set its `baseUrl` collection variable to the port in use. Run requests in order so the create request can set `productId` for the later requests.

## Verification
GET list, POST create, GET by ID, PUT update, DELETE, invalid POST, and GET-after-delete were exercised against the running Express server. Responses returned 200, 201, 400, or 404 as expected, and the request logger emitted method/URL/timestamp lines.

## GitHub
Sprint 12 files are ready to be committed and pushed after final verification.
