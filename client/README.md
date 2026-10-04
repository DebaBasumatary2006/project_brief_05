# Inventory Management System

## Project Title

Inventory Management System

## Team Members

- Roshni Lamichhane
- Aniket Saha
- Bhoben Sharma
- Deba Basumatary
- Vivek Magar

## Project Domain

Business

## Project Description

The Inventory Management System helps a business manage its inventory in one place.

It allows users to:

- Manage products
- Create and manage categories
- Manage suppliers
- Track stock in and stock out
- Record inventory transactions
- Create and track purchase orders
- Generate inventory reports
- Give different access to Admin, Inventory Manager, and Staff

## Project Objective

To develop an efficient inventory management system that helps businesses manage products, suppliers, stock, purchase orders, and inventory transactions in one place with role-based access.

## Technology Stack

### Frontend

- React.js
- Vite
- React Router DOM
- Axios
- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express.js
- CORS
- Dotenv
- Mongoose
- Nodemon

### Database

- MongoDB

### Development Tools

- Visual Studio Code
- Git
- GitHub

## Project Structure

```text
Inventory-Management-System/
│

## Frontend Setup

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

Create a production build to verify the frontend:

```bash
npm run build
```

## Frontend Foundation

Global design tokens are defined in `src/assets/styles/variables.css` and imported by `src/assets/styles/global.css`. The app entry point loads the global stylesheet along with the component, layout, and responsive styles. Reusable components live in `src/components/common/`, shared page structure lives in `src/layouts/`, and complete screens live in `src/pages/`.

Sprint 5 implementation notes are available in [../docs/sprint-5-react-frontend-foundation.md](../docs/sprint-5-react-frontend-foundation.md).

## Client-Side Navigation

`BrowserRouter` is configured in `src/main.jsx`, and `src/routes/AppRoutes.jsx` defines the application routes. The shared `MainLayout` keeps the navigation and footer in place while the active page changes. `NavLink` is used for in-app navigation, and a wildcard route displays the Not Found page for unknown paths.

Available pages include Home (`/`), Dashboard (`/dashboard`), Login (`/login`), Profile (`/profile`), and Product Entry (`/product-entry`). Sprint 6 implementation notes are available in [../docs/sprint-6-client-side-navigation.md](../docs/sprint-6-client-side-navigation.md).

## Reusable UI Components

Shared UI components are in `src/components/ui/`: `Button` forwards native button props, `Card` composes title/description/children, and `PageTitle` keeps page headings consistent. The Navbar and Footer are rendered through `MainLayout` so they remain consistent across routes. Sprint 7 implementation notes are available in [../docs/sprint-7-reusable-components-layout.md](../docs/sprint-7-reusable-components-layout.md).

## Frontend Styling

Global tokens and base styles live in `src/assets/styles/`; shared component, layout, and responsive rules live in `src/styles/`; Home and Product Entry keep their page-specific styles beside their components. Responsive rules adapt navigation, cards, page spacing, and forms for smaller screens. Sprint 8 styling notes are available in [../docs/sprint-8-frontend-styling.md](../docs/sprint-8-frontend-styling.md).

## React State and Events

The Dashboard demonstrates a controlled name input, a notification counter, and a local login-status toggle with React state. `Welcome` receives its name and project through props. These values are for frontend practice only and are not persisted or connected to the backend. Sprint 9 notes are available in [../docs/sprint-9-react-state-and-events.md](../docs/sprint-9-react-state-and-events.md).

## Controlled Product Form

The Product Entry page uses React state for all fields, validates inventory-specific rules before submission, displays field-level feedback, and clears data after success or reset. Submission is client-only and does not call the backend. Sprint 10 validation details are available in [../docs/sprint-10-controlled-product-form.md](../docs/sprint-10-controlled-product-form.md).
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── fonts/
│   │   │   ├── icons/
│   │   │   ├── images/
│   │   │   └── styles/
│   │   │       ├── global.css
│   │   │       └── variables.css
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   └── Loader.jsx
│   │   │   │
│   │   │   └── layout/
│   │   │       ├── Navbar.jsx
│   │   │       ├── Footer.jsx
│   │   │       └── Sidebar.jsx
│   │   │
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx
│   │   │   └── AuthLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Login/
│   │   │   ├── Dashboard/
│   │   │   ├── Profile/
│   │   │   └── NotFound/
│   │   │
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md