# MongoDB Collection Design

## 1. Users Collection
Stores user credentials, roles, and profile data.

### Fields
- _id: ObjectId
- name: String
- email: String
- password: String
- role: String (admin, inventory_manager, staff)
- phone: String
- address: String
- status: String (active, inactive)
- createdAt: Date
- updatedAt: Date

## 2. Categories Collection
Stores product categories.

### Fields
- _id: ObjectId
- name: String
- description: String
- createdBy: ObjectId (User)
- createdAt: Date
- updatedAt: Date

## 3. Suppliers Collection
Stores supplier information.

### Fields
- _id: ObjectId
- name: String
- contactPerson: String
- phone: String
- email: String
- address: String
- status: String
- createdAt: Date
- updatedAt: Date

## 4. Products Collection
Stores product inventory details.

### Fields
- _id: ObjectId
- name: String
- sku: String
- categoryId: ObjectId (Category)
- supplierId: ObjectId (Supplier)
- purchasePrice: Number
- sellingPrice: Number
- quantity: Number
- reorderLevel: Number
- description: String
- status: String (available, low_stock, discontinued)
- createdAt: Date
- updatedAt: Date

## 5. InventoryTransactions Collection
Stores all stock movement records.

### Fields
- _id: ObjectId
- productId: ObjectId (Product)
- type: String (stock_in, stock_out, adjustment)
- quantity: Number
- previousQuantity: Number
- newQuantity: Number
- referenceType: String (purchase_order, manual_adjustment, sale, stock_issue)
- referenceId: ObjectId
- performedBy: ObjectId (User)
- note: String
- createdAt: Date

## 6. PurchaseOrders Collection
Stores purchase order details.

### Fields
- _id: ObjectId
- orderNumber: String
- supplierId: ObjectId (Supplier)
- createdBy: ObjectId (User)
- totalAmount: Number
- status: String (pending, approved, received, cancelled)
- notes: String
- createdAt: Date
- updatedAt: Date

## 7. PurchaseOrderItems Collection
Stores each item listed inside a purchase order.

### Fields
- _id: ObjectId
- purchaseOrderId: ObjectId (PurchaseOrder)
- productId: ObjectId (Product)
- quantity: Number
- unitPrice: Number
- total: Number
- receivedQuantity: Number
- createdAt: Date

## 8. Data Relationship Summary
- One category has many products.
- One supplier can supply many products.
- One product can have many inventory transactions.
- One purchase order can contain many order items.
- One product can appear in many purchase order items.
- One user can create many purchase orders and inventory records.

## 9. Database Design Notes
This structure supports both operational and reporting requirements. It allows the system to track stock movement, manage product records, and maintain purchase and supplier histories efficiently.
