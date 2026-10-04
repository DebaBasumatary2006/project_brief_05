# Sprint 11: Express Backend Foundation

## Sprint Goal
Prepare the backend as a standalone Express application with a predictable entry point, modular route/controller structure, environment configuration, and a test endpoint.

## Completed Work
- Configured Express middleware for JSON and URL-encoded request bodies.
- Enabled CORS for local client/API communication.
- Kept application configuration in `server/app.js` and server startup in `server/server.js`.
- Added a root status endpoint and a modular `GET /api/test` route/controller.
- Confirmed environment-based port configuration and the MongoDB connection helper for future integration.
- Corrected the package entry point and documented server setup.
- Added `.env.example`; the actual `.env` remains ignored and local.

## Run Commands
```bash
cd server
npm install
npm run dev
```

Use `npm start` for a normal start. The default port is 5000; set `PORT` in the local `.env` file to override it.

## Verification
The Express server started successfully and `GET /api/test` returned a successful JSON response with a timestamp. The server does not connect to MongoDB in this foundation sprint, so it can be run without a database service.

## Client Integration
The API is available at `http://localhost:5000`; CORS and JSON parsing are configured for future client API requests. No inventory CRUD routes or database-backed features are introduced in this sprint.
