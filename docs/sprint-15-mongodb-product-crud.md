# Sprint 15: MongoDB Product CRUD API

## Sprint Goal

Replace the temporary in-memory product store with persistent MongoDB operations through the Sprint 14 Mongoose `Product` model.

## Request Flow

```text
Client / Postman -> Express route -> product controller -> Product model -> MongoDB
```

## Product API

Base path: `/api/products`

| Method | Endpoint | Purpose | Success status |
| --- | --- | --- | --- |
| POST | `/api/products` | Create a validated product document | 201 |
| GET | `/api/products` | Return all products and the result count | 200 |
| GET | `/api/products/:id` | Return one product by MongoDB ID | 200 |
| PUT | `/api/products/:id` | Apply supplied editable fields and return the validated product | 200 |
| DELETE | `/api/products/:id` | Delete a product and return the deleted document | 200 |

Updates accept one or more Product model fields. `_id`, timestamps, `__v`, and unknown fields cannot be changed through the API. Mongoose validation runs before an update is saved.

## Error Responses

| Status | Meaning |
| --- | --- |
| 400 | Invalid ID, malformed JSON, missing body, or Product validation failure |
| 404 | No product exists for a valid ID |
| 409 | The SKU is already in use |
| 413 | Request body exceeds Express's configured size limit |
| 500 | Unexpected database or server failure |

Error responses use `{ "success": false, "message": "..." }`. Internal database error details are logged on the server and are not returned to API clients.

## Run and Test

1. Start MongoDB locally or provide an Atlas URI in the private `server/.env` file as `MONGODB_URI`. Do not commit `.env`.
2. From `server/`, run `npm run dev`.
3. Import [`server/postman/Sprint15-Product-API.postman_collection.json`](../server/postman/Sprint15-Product-API.postman_collection.json) into Postman and set `baseUrl` if the server is not using port 5000.
4. Run the collection in order. The create request stores its MongoDB ID for the subsequent read, update, and delete requests.
5. In MongoDB Compass, inspect the `products` collection to verify the created record, updated quantity, and removal.

Run the automated model and HTTP API tests from `server/`:

```bash
npm test
```

The API tests exercise Express routes and response handling with isolated model stubs, so they do not require a live MongoDB instance. The Postman sequence against the configured database verifies persistence and the MongoDB Compass checks.
