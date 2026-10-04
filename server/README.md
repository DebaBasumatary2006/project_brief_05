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

## Structure

```text
server/
├── config/
│   └── db.js
├── controllers/
│   └── testController.js
├── middleware/
├── models/
├── routes/
│   └── testRoutes.js
├── services/
├── utils/
├── app.js
├── server.js
├── package.json
└── .env.example
```

`app.js` configures Express middleware and mounts routes. `server.js` starts listening. The database connection helper is present for later integration and is not invoked by this foundation server.
