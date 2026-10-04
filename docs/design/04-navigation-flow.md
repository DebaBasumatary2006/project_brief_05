# Application Navigation Flow

## 1. Administrator Navigation
```text
Login
  ↓
Dashboard
  ├── Users
  ├── Products
  ├── Categories
  ├── Suppliers
  ├── Inventory
  ├── Purchase Orders
  ├── Reports
  ├── Settings
  └── Profile
```

## 2. Inventory Manager Navigation
```text
Login
  ↓
Dashboard
  ├── Products
  ├── Suppliers
  ├── Inventory
  ├── Purchase Orders
  ├── Reports
  └── Profile
```

## 3. Staff Navigation
```text
Login
  ↓
Dashboard
  ├── Inventory
  ├── Products
  ├── Stock Transactions
  └── Profile
```

## 4. Role-Based Access Rules
- Administrator: full access to all modules.
- Inventory Manager: manages products, stock, purchase orders, and suppliers.
- Staff: limited to inventory and product viewing/stock updates based on permissions.

## 5. Typical User Workflow
```text
Login
  ↓
Dashboard
  ↓
Select Module
  ↓
View/Update Records
  ↓
Save or Submit Action
  ↓
System Updates Database
  ↓
Display Success/Status Message
```

## 6. Navigation Design Goal
The navigation flow is intentionally simple and role-specific so users can access relevant functions without confusion and without unnecessary system permissions.
