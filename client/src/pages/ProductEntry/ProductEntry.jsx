import { useState } from "react";
import "./ProductEntry.css";

const initialFormData = {
  productName: "",
  sku: "",
  category: "",
  supplier: "",
  purchasePrice: "",
  sellingPrice: "",
  quantity: "",
  reorderLevel: "",
  description: "",
};

function ProductEntry() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));

    setSuccessMessage("");
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.productName.trim()) {
      nextErrors.productName = "Product name is required.";
    } else if (formData.productName.trim().length < 2) {
      nextErrors.productName = "Product name must contain at least 2 characters.";
    }

    if (!formData.sku.trim()) {
      nextErrors.sku = "SKU is required.";
    } else if (!/^[A-Za-z0-9-]+$/.test(formData.sku.trim())) {
      nextErrors.sku = "SKU may contain letters, numbers, and hyphens only.";
    }

    if (!formData.category.trim()) {
      nextErrors.category = "Category is required.";
    }

    if (!formData.supplier.trim()) {
      nextErrors.supplier = "Supplier name is required.";
    }

    if (!formData.purchasePrice) {
      nextErrors.purchasePrice = "Purchase price is required.";
    } else if (Number(formData.purchasePrice) <= 0) {
      nextErrors.purchasePrice = "Purchase price must be greater than 0.";
    }

    if (!formData.sellingPrice) {
      nextErrors.sellingPrice = "Selling price is required.";
    } else if (Number(formData.sellingPrice) <= 0) {
      nextErrors.sellingPrice = "Selling price must be greater than 0.";
    } else if (Number(formData.sellingPrice) < Number(formData.purchasePrice)) {
      nextErrors.sellingPrice = "Selling price cannot be lower than the purchase price.";
    }

    if (!formData.quantity) {
      nextErrors.quantity = "Stock quantity is required.";
    } else if (!Number.isInteger(Number(formData.quantity)) || Number(formData.quantity) < 0) {
      nextErrors.quantity = "Quantity must be a whole number greater than or equal to 0.";
    }

    if (!formData.reorderLevel) {
      nextErrors.reorderLevel = "Reorder level is required.";
    } else if (!Number.isInteger(Number(formData.reorderLevel)) || Number(formData.reorderLevel) < 0) {
      nextErrors.reorderLevel = "Reorder level must be a whole number greater than or equal to 0.";
    }

    if (!formData.description.trim()) {
      nextErrors.description = "Description is required.";
    } else if (formData.description.trim().length < 10) {
      nextErrors.description = "Description must be at least 10 characters long.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log("Product submitted:", formData);
    setSuccessMessage("Product added successfully. Inventory has been updated.");
    setFormData(initialFormData);
    setErrors({});
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setSuccessMessage("");
  };

  return (
    <div className="product-entry-page">
      <div className="product-entry-container">
        <div className="heading-block">
          <p className="eyebrow">Inventory Management</p>
          <h1>Product Entry Form</h1>
          <p className="form-description">
            Add a new product to the business inventory system and keep stock information accurate.
          </p>
        </div>

        {successMessage && <div className="success-message">{successMessage}</div>}

        <form onSubmit={handleSubmit} noValidate className="product-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="productName">
                Product Name <span>*</span>
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Enter product name"
                className={errors.productName ? "input-error" : ""}
              />
              {errors.productName && <p className="error-message">{errors.productName}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="sku">
                SKU <span>*</span>
              </label>
              <input
                type="text"
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="e.g. LAP-001"
                className={errors.sku ? "input-error" : ""}
              />
              {errors.sku && <p className="error-message">{errors.sku}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">
                Category <span>*</span>
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter category"
                className={errors.category ? "input-error" : ""}
              />
              {errors.category && <p className="error-message">{errors.category}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="supplier">
                Supplier <span>*</span>
              </label>
              <input
                type="text"
                id="supplier"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                placeholder="Enter supplier"
                className={errors.supplier ? "input-error" : ""}
              />
              {errors.supplier && <p className="error-message">{errors.supplier}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="purchasePrice">
                Purchase Price <span>*</span>
              </label>
              <input
                type="number"
                id="purchasePrice"
                name="purchasePrice"
                value={formData.purchasePrice}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                className={errors.purchasePrice ? "input-error" : ""}
              />
              {errors.purchasePrice && <p className="error-message">{errors.purchasePrice}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="sellingPrice">
                Selling Price <span>*</span>
              </label>
              <input
                type="number"
                id="sellingPrice"
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                className={errors.sellingPrice ? "input-error" : ""}
              />
              {errors.sellingPrice && <p className="error-message">{errors.sellingPrice}</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">
                Quantity in Stock <span>*</span>
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter current stock"
                min="0"
                step="1"
                className={errors.quantity ? "input-error" : ""}
              />
              {errors.quantity && <p className="error-message">{errors.quantity}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="reorderLevel">
                Reorder Level <span>*</span>
              </label>
              <input
                type="number"
                id="reorderLevel"
                name="reorderLevel"
                value={formData.reorderLevel}
                onChange={handleChange}
                placeholder="Ideal warning count"
                min="0"
                step="1"
                className={errors.reorderLevel ? "input-error" : ""}
              />
              {errors.reorderLevel && <p className="error-message">{errors.reorderLevel}</p>}
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">
              Description <span>*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add product details, use, or specifications"
              rows="5"
              className={errors.description ? "input-error" : ""}
            />
            {errors.description && <p className="error-message">{errors.description}</p>}
          </div>

          <div className="form-buttons">
            <button type="submit" className="add-button">
              Add Product
            </button>

            <button type="button" className="reset-button" onClick={handleReset}>
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductEntry;