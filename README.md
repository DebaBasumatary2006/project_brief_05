# Inventory Management System

## Project Title
Inventory Management System

## Project Domain
Business / Enterprise Inventory Management

## Team Members
- Roshni Lamichhane
- Aniket Saha
- Bhoben Sharma
- Deba Basumatary
- Vivek Magar

## Project Brief
The Inventory Management System is a web-based solution designed to help businesses efficiently manage products, categories, suppliers, stock movement, and purchase orders. It enables teams to maintain accurate inventory records, improve purchasing decisions, reduce stock shortages, and monitor operational efficiency.

## Project Objective
To build a secure, scalable, and user-friendly MERN Stack inventory application that supports product management, stock tracking, supplier coordination, order management, and role-based access for administrators, inventory managers, and staff.

## Technology Stack
- MongoDB
- Express.js
- React.js
- Node.js
- Git
- GitHub
- VS Code

## MERN Stack Overview
- MongoDB stores the application data.
- Express.js handles backend APIs and server logic.
- React.js powers the user interface.
- Node.js provides the JavaScript runtime for the server.

## Core Modules
- User Management
- Product Management
- Category Management
- Supplier Management
- Inventory Management
- Purchase Order Management

## Roles
### Administrator
- Manage users, products, categories, suppliers, reports, and settings

### Inventory Manager
- Manage stock, suppliers, purchase orders, and inventory transactions

### Staff
- View inventory and record stock-related transactions according to permissions

## Project Structure
project-name/
├── client/
├── server/
├── docs/
├── README.md
├── .gitignore
└── .env

## Local Setup
1. Install Node.js LTS and Git.
2. Open the project in VS Code.
3. Navigate to the client and server folders separately.
4. Install dependencies using npm.
5. Start the frontend and backend servers using the provided scripts.

## Recommended Local Run Commands
```bash
cd client
npm install
npm run dev
```

```bash
cd server
npm install
npm run dev
```

## Git Status
This repository is initialized for active development. Sprint 4 for project scaffolding and environment setup was completed locally and synced to the remote GitHub repository.

## Sprint 4: Project Scaffolding & Development Environment
This sprint established the working MERN project foundation by creating a separate React frontend and an Express backend, organizing the folder structure, installing required dependencies, and ensuring both applications run independently.

### Completed work
- Initialized the frontend React application in the `client` folder.
- Initialized the backend Express server in the `server` folder.
- Organized project folders for future modules and features.
- Installed required dependencies for both frontend and backend.
- Verified that both applications run without startup errors.
- Documented the setup and project flow in the sprint notes.

### Frontend commands
```bash
cd client
npm install
npm run dev -- --host 0.0.0.0
```

### Backend commands
```bash
cd server
npm install
npm run start
```

### Root-level project commands
```bash
npm install --prefix client
npm install --prefix server
npm run dev:client
npm run dev:server
npm run build:client
```

### Dependency summary
- Frontend: React, Vite, React Router DOM, Axios
- Backend: Express, CORS, Dotenv, Mongoose, bcryptjs, jsonwebtoken, Nodemon

### Verification summary
- Client build succeeded with `npm run build`.
- Backend started successfully on port 5000.
- Frontend served successfully on port 5174.
- Backend API responded with valid JSON at `/api/test`.

## Sprint 4 Documentation
Detailed setup and verification notes are available in [docs/sprint-4-project-scaffolding.md](docs/sprint-4-project-scaffolding.md).

## Sprint 11: Express Backend Foundation
The backend runs as a separate Express application with JSON parsing, CORS, environment configuration, a health endpoint, and a modular API test route. Setup instructions are in [server/README.md](server/README.md), and detailed Sprint 11 notes are in [docs/sprint-11-express-backend.md](docs/sprint-11-express-backend.md).

## Sprint 12: Express Routing and Middleware
The backend now includes in-memory product CRUD routes, controller separation, and request logging middleware. See [docs/sprint-12-express-routing-middleware.md](docs/sprint-12-express-routing-middleware.md) and the Postman collection in `server/postman/` for endpoint details and verification.

## Sprint 13: MongoDB Setup and Backend Database Connection
The backend now connects to MongoDB through Mongoose using the private `MONGODB_URI` environment variable and ensures the initial `products` collection exists. Product CRUD remains in memory for this sprint. See [docs/sprint-13-mongodb-connection.md](docs/sprint-13-mongodb-connection.md) for setup and verification instructions.

## Sprint 14: Mongoose Schemas and Models
The backend now defines a validated Product schema and model mapped to the `products` collection. The model matches the Product Entry form, and focused validation tests run with `npm test` from `server/`. Database-backed CRUD remains for a later sprint. See [docs/sprint-14-mongoose-models.md](docs/sprint-14-mongoose-models.md) for the field table and schema/model explanation.

## Sprint 15: MongoDB Product CRUD API
The product API now uses the Sprint 14 Mongoose model for persistent create, list, retrieve-by-ID, update, and delete operations. Invalid IDs and product validation errors return controlled client errors, missing products return 404, duplicate SKUs return 409, and unexpected database failures return a generic 500 response. See [docs/sprint-15-mongodb-product-crud.md](docs/sprint-15-mongodb-product-crud.md) for setup, endpoint details, tests, and the Postman collection.

## Sprint 16: React and REST API Integration
The React client now uses the Sprint 15 Product API to load inventory, create products, edit records, and delete them after confirmation. The product service centralizes API calls, while the interface provides loading, error, and success states. See [docs/sprint-16-react-api-integration.md](docs/sprint-16-react-api-integration.md) for API configuration and the end-to-end verification steps.

## Sprint 17: Category CRUD Module
The Inventory Management System now includes a MongoDB-backed Category API and a React Categories page, using the same modular CRUD architecture as Products. Product Entry uses active categories from the Category API. See [docs/sprint-17-category-crud-module.md](docs/sprint-17-category-crud-module.md) for the model, endpoints, setup, and verification.

## Sprint 1 Goal
This project foundation stage ensures the workspace is ready for development by validating:
- required software installation
- project structure organization
- Git repository setup
- documentation preparation
- team coordination
- future sprint expansion

## Development Notes
The project is being developed using a modular architecture so that the client, server, and documentation can be extended cleanly in future sprints.