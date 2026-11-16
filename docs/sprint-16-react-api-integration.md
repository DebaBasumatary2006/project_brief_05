# Sprint 16: Connecting React Frontend with REST APIs

## Sprint Goal

Connect the React inventory screens to the MongoDB-backed Product API from Sprint 15 so users can view, create, update, and delete real product records.

## Request Flow

```text
React page -> productService.js -> Express /api/products -> Mongoose Product -> MongoDB
```

The client uses Axios, which is already part of the frontend dependencies. API requests are centralized in `client/src/services/productService.js`; `client/src/hooks/useProducts.js` loads products and exposes loading, error, and refresh state.

## Product Interface

The Home page loads live inventory metrics, low-stock products, and recently added products. The Product Entry page:

- Loads products from the API and shows loading, error, retry, and empty states.
- Creates products through `POST /api/products`.
- Pre-fills the validated form to edit a product through `PUT /api/products/:id`.
- Requests confirmation before deleting through `DELETE /api/products/:id`.
- Updates the visible list after successful create, update, or delete responses.

The React client never connects directly to MongoDB.

## API Configuration and CORS

The API base URL is read from `VITE_API_BASE_URL`. It defaults to `http://localhost:5000/api`, matching the Express server's default port and route prefix. Set a different base URL in the client environment when needed, then restart Vite for the setting to take effect.

The Express application already enables CORS for local development, allowing Vite and Express to run on separate origins without disabling browser security.

## Run Both Applications

1. Start MongoDB and ensure the backend `server/.env` has a valid private `MONGODB_URI`.
2. From `server/`, run:

   ```bash
   npm run dev
   ```

3. From `client/`, run:

   ```bash
   npm run dev
   ```

4. Open the Vite URL and go to **Product Entry**.
5. Create a product, verify it appears in the list and MongoDB Compass, edit its quantity, then delete it after confirming.
6. Check the Home page to confirm its metrics and product panels reflect the same API data.

## Verification

Run the frontend checks from `client/`:

```bash
npm run lint
npm run build
```

Run the backend regression tests from `server/`:

```bash
npm test
```

For the complete persistence check, perform the UI workflow against the configured MongoDB database and verify each create, update, and delete in MongoDB Compass. Do not commit environment files or database credentials.
