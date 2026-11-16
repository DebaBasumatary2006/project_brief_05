import { useState } from "react";
import Button from "../../components/ui/Button";
import Loader from "../../components/common/Loader";
import PageTitle from "../../components/ui/PageTitle";
import useProducts from "../../hooks/useProducts";
import {
  createProduct,
  deleteProduct,
  getProductServiceErrorMessage,
  updateProduct,
} from "../../services/productService";
import "./ProductEntry.css";
import "./ProductList.css";

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
  const [actionError, setActionError] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const { products, setProducts, isLoading, error, refresh } = useProducts();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => {
      const nextErrors = { ...previousErrors, [name]: "" };

      if (name === "purchasePrice") {
        nextErrors.sellingPrice = "";
      }

      return nextErrors;
    });

    setSuccessMessage("");
    setActionError("");
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

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setEditingProductId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setActionError("");

    if (!validateForm()) {
      return;
    }

    const productData = {
      ...formData,
      productName: formData.productName.trim(),
      sku: formData.sku.trim(),
      category: formData.category.trim(),
      supplier: formData.supplier.trim(),
      purchasePrice: Number(formData.purchasePrice),
      sellingPrice: Number(formData.sellingPrice),
      quantity: Number(formData.quantity),
      reorderLevel: Number(formData.reorderLevel),
      description: formData.description.trim(),
    };

    setIsSubmitting(true);
    try {
      if (editingProductId) {
        const updatedProduct = await updateProduct(editingProductId, productData);
        setProducts((currentProducts) =>
          currentProducts.map((product) =>
            product._id === editingProductId ? updatedProduct : product,
          ),
        );
        setSuccessMessage("Product updated successfully.");
      } else {
        const createdProduct = await createProduct(productData);
        setProducts((currentProducts) => [createdProduct, ...currentProducts]);
        setSuccessMessage("Product created successfully.");
      }

      resetForm();
    } catch (requestError) {
      setActionError(
        getProductServiceErrorMessage(
          requestError,
          "Unable to save the product. Please try again.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    resetForm();
    setSuccessMessage("");
    setActionError("");
  };

  const handleEdit = (product) => {
    setEditingProductId(product._id);
    setFormData({
      productName: product.productName,
      sku: product.sku,
      category: product.category,
      supplier: product.supplier,
      purchasePrice: String(product.purchasePrice),
      sellingPrice: String(product.sellingPrice),
      quantity: String(product.quantity),
      reorderLevel: String(product.reorderLevel),
      description: product.description,
    });
    setErrors({});
    setSuccessMessage("");
    setActionError("");
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Delete "${product.productName}"? This action cannot be undone.`,
    );
    if (!confirmed) {
      return;
    }

    setDeletingProductId(product._id);
    setActionError("");
    setSuccessMessage("");

    try {
      await deleteProduct(product._id);
      setProducts((currentProducts) =>
        currentProducts.filter((item) => item._id !== product._id),
      );
      if (editingProductId === product._id) {
        resetForm();
      }
      setSuccessMessage("Product deleted successfully.");
    } catch (requestError) {
      setActionError(
        getProductServiceErrorMessage(
          requestError,
          "Unable to delete the product. Please try again.",
        ),
      );
    } finally {
      setDeletingProductId(null);
    }
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <div className="product-entry-page">
      <div className="product-entry-container">
        <div className="heading-block">
          <p className="eyebrow">Inventory Management</p>
          <PageTitle>{editingProductId ? "Edit Product" : "Product Entry Form"}</PageTitle>
          <p className="form-description">
            Add products to the live inventory or update existing product records.
          </p>
        </div>

        {hasErrors && (
          <div className="error-summary" role="alert">
            Please correct the highlighted fields before submitting.
          </div>
        )}

        {successMessage && (
          <div className="success-message" role="status" aria-live="polite">
            {successMessage}
          </div>
        )}

        {actionError && (
          <div className="error-summary" role="alert">
            {actionError}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="product-form"
          inert={isSubmitting}
        >
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
                required
                aria-invalid={Boolean(errors.productName)}
                aria-describedby={errors.productName ? "productName-error" : undefined}
              />
              {errors.productName && <p id="productName-error" className="error-message">{errors.productName}</p>}
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
                required
                aria-invalid={Boolean(errors.sku)}
                aria-describedby={errors.sku ? "sku-error" : undefined}
              />
              {errors.sku && <p id="sku-error" className="error-message">{errors.sku}</p>}
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
                required
                aria-invalid={Boolean(errors.category)}
                aria-describedby={errors.category ? "category-error" : undefined}
              />
              {errors.category && <p id="category-error" className="error-message">{errors.category}</p>}
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
                required
                aria-invalid={Boolean(errors.supplier)}
                aria-describedby={errors.supplier ? "supplier-error" : undefined}
              />
              {errors.supplier && <p id="supplier-error" className="error-message">{errors.supplier}</p>}
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
                min="0.01"
                step="0.01"
                className={errors.purchasePrice ? "input-error" : ""}
                required
                aria-invalid={Boolean(errors.purchasePrice)}
                aria-describedby={errors.purchasePrice ? "purchasePrice-error" : undefined}
              />
              {errors.purchasePrice && <p id="purchasePrice-error" className="error-message">{errors.purchasePrice}</p>}
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
                min="0.01"
                step="0.01"
                className={errors.sellingPrice ? "input-error" : ""}
                required
                aria-invalid={Boolean(errors.sellingPrice)}
                aria-describedby={errors.sellingPrice ? "sellingPrice-error" : undefined}
              />
              {errors.sellingPrice && <p id="sellingPrice-error" className="error-message">{errors.sellingPrice}</p>}
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
                required
                aria-invalid={Boolean(errors.quantity)}
                aria-describedby={errors.quantity ? "quantity-error" : undefined}
              />
              {errors.quantity && <p id="quantity-error" className="error-message">{errors.quantity}</p>}
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
                required
                aria-invalid={Boolean(errors.reorderLevel)}
                aria-describedby={errors.reorderLevel ? "reorderLevel-error" : undefined}
              />
              {errors.reorderLevel && <p id="reorderLevel-error" className="error-message">{errors.reorderLevel}</p>}
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
              required
              aria-invalid={Boolean(errors.description)}
              aria-describedby={errors.description ? "description-error" : undefined}
            />
            {errors.description && <p id="description-error" className="error-message">{errors.description}</p>}
          </div>

          <div className="form-buttons">
            <Button type="submit" className="add-button" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : editingProductId
                  ? "Update Product"
                  : "Add Product"}
            </Button>

            <Button type="button" className="reset-button" onClick={handleReset}>
              {editingProductId ? "Cancel Edit" : "Reset Form"}
            </Button>
          </div>
        </form>

        <section className="product-list-section" aria-labelledby="product-list-title">
          <div className="product-list-heading">
            <div>
              <h2 id="product-list-title">Products in Inventory</h2>
              <p>Records are loaded from the connected inventory API.</p>
            </div>
            <Button
              type="button"
              className="product-refresh-button"
              onClick={refresh}
              disabled={isLoading}
            >
              Refresh
            </Button>
          </div>

          {error && (
            <div className="product-list-error" role="alert">
              <p>{error}</p>
              <Button type="button" onClick={refresh} disabled={isLoading}>
                Retry
              </Button>
            </div>
          )}

          {isLoading ? (
            <Loader />
          ) : products.length === 0 ? (
            <p className="product-list-empty">
              {error ? "Products could not be loaded." : "No products found. Add your first product above."}
            </p>
          ) : (
            <div className="product-table-wrap">
              <table className="product-table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">SKU</th>
                    <th scope="col">Category</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Selling Price</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td data-label="Product">{product.productName}</td>
                      <td data-label="SKU">{product.sku}</td>
                      <td data-label="Category">{product.category}</td>
                      <td data-label="Stock">
                        <span
                          className={
                            product.quantity <= product.reorderLevel
                              ? "product-stock-status product-stock-status--low"
                              : "product-stock-status"
                          }
                        >
                          {product.quantity}
                          {product.quantity <= product.reorderLevel ? " (Low)" : ""}
                        </span>
                      </td>
                      <td data-label="Selling Price">
                        {Number(product.sellingPrice).toFixed(2)}
                      </td>
                      <td data-label="Actions" className="product-table-actions">
                        <Button
                          type="button"
                          className="product-edit-button"
                          onClick={() => handleEdit(product)}
                          disabled={isSubmitting || Boolean(deletingProductId)}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          className="product-delete-button"
                          onClick={() => handleDelete(product)}
                          disabled={isSubmitting || Boolean(deletingProductId)}
                        >
                          {deletingProductId === product._id ? "Deleting..." : "Delete"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ProductEntry;