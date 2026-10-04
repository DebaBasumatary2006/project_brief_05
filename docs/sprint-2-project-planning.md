# Sprint 2: Project Planning & Requirement Analysis

## 1. Selected Project
**Project Name:** Inventory Management System  
**Template ID:** T5  
**Domain:** Business  
**Difficulty Level:** Medium

## 2. Problem Statement
Many small and medium-sized businesses still rely on spreadsheets and manual methods to manage stock, supplier records, inventory movement, and purchase orders. This leads to common problems such as inaccurate stock counts, inventory shortages, delayed purchasing decisions, duplicate product entries, and poor visibility into supplier and stock data.

The Inventory Management System solves this problem by providing a centralized, web-based platform to manage products, categories, suppliers, stock transactions, and purchase orders in one place. It helps businesses maintain accurate inventory data and improve decision-making.

## 3. Project Objective
To develop a secure, scalable, and user-friendly Inventory Management System that allows businesses to manage products, categories, suppliers, stock, inventory transactions, and purchase orders efficiently while improving operational accuracy and business productivity.

## 4. Stakeholders
### Administrator
- Manages users and roles
- Controls overall system access and settings
- Manages products, suppliers, categories, reports, and system configuration

### Inventory Manager
- Manages stock movement
- Creates and updates purchase orders
- Tracks inventory history
- Monitors stock levels and supplier information

### Staff
- Views inventory information
- Updates stock quantities according to permissions
- Records stock-in and stock-out transactions
- Works with basic inventory operations

### Suppliers
- Provide products and business materials to the company
- Receive purchase orders and supply shipments

### Business Owners / Management
- Reviews inventory status and reports
- Monitors operational performance
- Makes business decisions based on system data

## 5. Project Scope
### Included Features
- User registration and login
- JWT authentication
- Role-based authorization
- Product management
- Category management
- Supplier management
- Inventory stock management
- Stock in, stock out, and adjustment tracking
- Inventory history
- Purchase order creation and tracking
- Dashboard and reports
- Profile management
- Responsive web application interface

### Excluded Features
- Mobile app development
- Barcode scanning
- Warehouse management
- Multi-warehouse tracking
- Advanced forecasting
- AI-based inventory predictions
- Payment gateway integration
- Third-party ERP integration
- Advanced analytics and business intelligence features beyond the initial scope

## 6. Functional Requirements
### Authentication and User Management
- Users should be able to register an account.
- Users should be able to log in securely.
- Users should be able to view and update their profile.
- User roles should be assigned such as Administrator, Inventory Manager, and Staff.
- The system should restrict access based on user role.

### Product Management
- Admin or authorized users should be able to add products.
- Users should be able to edit product details.
- Users should be able to delete products.
- Users should be able to search products.
- Users should be able to view product details.
- Products should be associated with categories.

### Category Management
- Users should be able to create categories.
- Users should be able to update category details.
- Users should be able to delete categories.
- Categories should be assigned to products.

### Supplier Management
- Users should be able to add suppliers.
- Users should be able to edit supplier information.
- Users should be able to delete supplier records.
- Users should be able to search for suppliers.
- Supplier information should be stored and visible when needed.

### Inventory Management
- Users should be able to record stock-in transactions.
- Users should be able to record stock-out transactions.
- Users should be able to perform stock adjustments.
- The system should maintain inventory history.
- The system should show current stock quantities.
- Inventory movement should be tracked efficiently.

### Purchase Order Management
- Users should be able to create purchase orders.
- Users should be able to update purchase orders.
- Users should be able to view purchase history.
- Purchase orders should be associated with suppliers.
- Order status should be tracked.

### Dashboard and Reports
- The system should show inventory summary data.
- Dashboard should display stock status and key metrics.
- Reports should help monitor inventory movement and product status.

## 7. Non-Functional Requirements
### Security
- Passwords must be hashed before storage.
- JWT-based authentication should be used.
- Protected routes must restrict unauthorized access.
- User input must be validated.

### Performance
- Search operations for products and suppliers should be fast.
- Stock updates should be efficient.
- API responses should be responsive.

### Usability
- The interface should be simple and user-friendly.
- Navigation should be easy for non-technical users.
- The application should be responsive on desktop and tablet screens.

### Reliability
- The system should operate without crashing during normal use.
- Inventory data should be stored consistently.

### Maintainability
- Code should be modular and organized.
- Frontend and backend logic should be separated.
- The project should support easy future enhancements.

### Scalability
- The system should support future growth like multiple warehouses or advanced reporting.
- The architecture should allow additional modules without major redesign.

## 8. Initial Project Summary
### Project Title
Inventory Management System

### Problem Statement
Businesses often lose accuracy and efficiency while managing stock, suppliers, and purchase orders manually. This leads to stock shortages, duplicated records, slow operations, and poor purchasing decisions. An automated system is needed to centralize inventory data and streamline operational tasks.

### Objective
The objective of this project is to create a full-stack business application that allows companies to centralize product, supplier, inventory, and purchase order management while improving control, visibility, and operational efficiency.

### Target Users
- Administrator
- Inventory Manager
- Staff
- Suppliers
- Business Owners / Management

### Core Modules
- User Management
- Product Management
- Category Management
- Supplier Management
- Inventory Management
- Purchase Order Management

### Scope
The system will include product tracking, inventory updates, supplier records, purchase orders, and user access management. It will not include advanced AI, ERP integrations, mobile apps, or multi-warehouse support in the initial phase.

### Expected Outcome
The final system will help the business manage inventory more accurately, reduce operational errors, and provide a clear digital workflow for stock control and supply management.

## 9. Sprint 2 Completion Notes
This document establishes the initial project foundation for the Inventory Management System. It defines the key problem, stakeholders, system objective, scope, and requirements. These elements will guide system design, database planning, API development, and frontend page design in upcoming sprints.

## 10. Deliverables Summary
- Selected Project: Inventory Management System
- Problem statement prepared
- Project objective defined
- Stakeholders identified
- Functional requirements documented
- Non-functional requirements documented
- Initial project summary prepared
- Documentation stored in the docs folder for future sprint work
