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