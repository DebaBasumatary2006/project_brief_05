# Entity Relationship Diagram (ERD)

## 1. Core Entities
The Inventory Management System will include these main entities:
- User
- Category
- Product
- Supplier
- InventoryTransaction
- PurchaseOrder
- PurchaseOrderItem

## 2. ERD Relationship Overview

```text
User
  |
  | 1 ───< many
  v
InventoryTransaction

Category
  |
  | 1 ───< many
  v
Product
  |
  | 1 ───< many
  v
InventoryTransaction

Supplier
  |
  | 1 ───< many
  v
Product
  |
  | 1 ───< many
  v
PurchaseOrderItem

PurchaseOrder
  |
  | 1 ───< many
  v
PurchaseOrderItem
  |
  | many ───> 1
  v
Product

Supplier
  |
  | 1 ───< many
  v
PurchaseOrder
```

## 3. Relationship Explanation
### User and InventoryTransaction
- One user can perform many inventory transactions.
- Each inventory transaction is performed by one user.

### Category and Product
- One category can contain many products.
- Each product belongs to one category.

### Supplier and Product
- One supplier can supply many products.
- Each product is supplied by one supplier.

### Product and InventoryTransaction
- One product can have many inventory transactions.
- Each inventory transaction relates to one product.

### Supplier and PurchaseOrder
- One supplier can have many purchase orders.
- Each purchase order is associated with one supplier.

### PurchaseOrder and PurchaseOrderItem
- One purchase order can contain many order items.
- Each purchase order item belongs to one purchase order.

### Product and PurchaseOrderItem
- One product can appear in many purchase order items.
- Each purchase order item refers to one product.

## 4. ERD Design Summary
This database design supports real-world inventory workflows by linking products, categories, suppliers, stock activities, and purchase orders into a consistent relational structure.
