# Sprint 14: Mongoose Schemas and Models

## Sprint Goal

Define the project-specific inventory Product structure, its field types and validation, and map its Mongoose model to the `products` collection created in Sprint 13.

## Product Field Definition

| Field | Type | Required | Rules / default |
| --- | --- | --- | --- |
| `productName` | String | Yes | Trimmed; at least 2 characters |
| `sku` | String | Yes | Trimmed; letters, numbers, and hyphens; unique index |
| `category` | String | Yes | Trimmed |
| `supplier` | String | Yes | Trimmed |
| `purchasePrice` | Number | Yes | Greater than 0 |
| `sellingPrice` | Number | Yes | Greater than 0 and not below purchase price |
| `quantity` | Number | Yes | Whole number, at least 0 |
| `reorderLevel` | Number | Yes | Whole number, at least 0 |
| `description` | String | Yes | Trimmed; at least 10 characters |
| `isActive` | Boolean | No | Defaults to `true` |
| `createdAt`, `updatedAt` | Date | Automatic | Managed by Mongoose timestamps |

These fields align with the existing Product Entry form and inventory requirements. The model file is `server/models/Product.js`.

## Schema and Model

A **schema** defines a document's fields, types, defaults, and validation rules. A **model** is the compiled interface created from that schema; it is used to create, query, update, and delete documents in a MongoDB collection. `Product` is explicitly mapped to the `products` collection.

## Verification

Run the model validation tests from `server/`:

```bash
npm test
```

Start the backend using the Sprint 13 `.env` setup and confirm it connects to MongoDB and stays running:

```bash
npm run dev
```

No product CRUD endpoints or frontend changes are part of this sprint; the model prepares the data layer for the next sprint.
