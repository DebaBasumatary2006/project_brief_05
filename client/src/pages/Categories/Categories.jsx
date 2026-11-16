import { useState } from "react";
import Button from "../../components/ui/Button";
import Loader from "../../components/common/Loader";
import PageTitle from "../../components/ui/PageTitle";
import useCategories from "../../hooks/useCategories";
import { getApiErrorMessage } from "../../services/apiClient";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../services/categoryService";
import "./Categories.css";

const initialFormData = {
  name: "",
  description: "",
  isActive: true,
};

function Categories() {
  const { categories, setCategories, isLoading, error, refresh } =
    useCategories();
  const [formData, setFormData] = useState(initialFormData);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [nameError, setNameError] = useState("");

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingCategoryId(null);
    setNameError("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: name === "isActive" ? value === "true" : value,
    }));
    setNameError("");
    setActionError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setActionError("");
    setSuccessMessage("");

    const categoryData = {
      ...formData,
      name: formData.name.trim(),
      description: formData.description.trim(),
    };
    if (categoryData.name.length < 2) {
      setNameError("Category name must contain at least 2 characters.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingCategoryId) {
        const updatedCategory = await updateCategory(
          editingCategoryId,
          categoryData,
        );
        setCategories((currentCategories) =>
          currentCategories.map((category) =>
            category._id === editingCategoryId ? updatedCategory : category,
          ),
        );
        setSuccessMessage("Category updated successfully.");
      } else {
        const createdCategory = await createCategory(categoryData);
        setCategories((currentCategories) =>
          [...currentCategories, createdCategory].sort((first, second) =>
            first.name.localeCompare(second.name),
          ),
        );
        setSuccessMessage("Category created successfully.");
      }

      resetForm();
    } catch (requestError) {
      setActionError(
        getApiErrorMessage(
          requestError,
          "Unable to save the category. Please try again.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (category) => {
    setEditingCategoryId(category._id);
    setFormData({
      name: category.name,
      description: category.description,
      isActive: category.isActive,
    });
    setNameError("");
    setActionError("");
    setSuccessMessage("");
  };

  const handleDelete = async (category) => {
    if (!window.confirm(`Delete "${category.name}"? This cannot be undone.`)) {
      return;
    }

    setDeletingCategoryId(category._id);
    setActionError("");
    setSuccessMessage("");
    try {
      await deleteCategory(category._id);
      setCategories((currentCategories) =>
        currentCategories.filter((item) => item._id !== category._id),
      );
      if (editingCategoryId === category._id) {
        resetForm();
      }
      setSuccessMessage("Category deleted successfully.");
    } catch (requestError) {
      setActionError(
        getApiErrorMessage(
          requestError,
          "Unable to delete the category. Please try again.",
        ),
      );
    } finally {
      setDeletingCategoryId(null);
    }
  };

  const handleReset = () => {
    resetForm();
    setSuccessMessage("");
    setActionError("");
  };

  return (
    <div className="category-page">
      <header className="category-page__header">
        <div>
          <p className="category-page__eyebrow">INVENTORY ORGANIZATION</p>
          <PageTitle className="category-page__title">Categories</PageTitle>
          <p className="category-page__intro">
            Organize product records with reusable inventory categories.
          </p>
        </div>
        <span className="category-page__count">
          {isLoading
            ? "Loading categories..."
            : `${categories.length} ${
                categories.length === 1 ? "category" : "categories"
              }`}
        </span>
      </header>

      {successMessage && (
        <p className="category-message category-message--success" role="status">
          {successMessage}
        </p>
      )}
      {actionError && (
        <p className="category-message category-message--error" role="alert">
          {actionError}
        </p>
      )}

      <section className="category-panel" aria-labelledby="category-form-title">
        <h2 id="category-form-title">
          {editingCategoryId ? "Edit Category" : "Add Category"}
        </h2>
        <form onSubmit={handleSubmit} className="category-form">
          <div className="category-form__fields">
            <div className="category-form__field">
              <label htmlFor="category-name">
                Category Name <span>*</span>
              </label>
              <input
                id="category-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                maxLength={60}
                required
                aria-invalid={Boolean(nameError)}
                aria-describedby={nameError ? "category-name-error" : undefined}
                placeholder="e.g. Office Supplies"
                disabled={isSubmitting}
              />
              {nameError && (
                <p id="category-name-error" className="category-form__error">
                  {nameError}
                </p>
              )}
            </div>

            <div className="category-form__field">
              <label htmlFor="category-status">Status</label>
              <select
                id="category-status"
                name="isActive"
                value={String(formData.isActive)}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            <div className="category-form__field category-form__field--wide">
              <label htmlFor="category-description">Description</label>
              <textarea
                id="category-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                maxLength={250}
                rows={3}
                placeholder="Describe the products in this category"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="category-form__actions">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : editingCategoryId
                  ? "Update Category"
                  : "Save Category"}
            </Button>
            <Button
              type="button"
              className="category-button--secondary"
              onClick={handleReset}
              disabled={isSubmitting}
            >
              {editingCategoryId ? "Cancel Edit" : "Clear Form"}
            </Button>
          </div>
        </form>
      </section>

      <section
        className="category-panel category-panel--list"
        aria-labelledby="category-list-title"
      >
        <div className="category-list__heading">
          <div>
            <h2 id="category-list-title">Category Catalog</h2>
            <p>Changes are saved to the connected inventory database.</p>
          </div>
          <Button
            type="button"
            className="category-button--secondary"
            onClick={refresh}
            disabled={isLoading}
          >
            Refresh
          </Button>
        </div>

        {error && (
          <div className="category-list__error" role="alert">
            <p>{error}</p>
            <Button type="button" onClick={refresh} disabled={isLoading}>
              Retry
            </Button>
          </div>
        )}

        {isLoading ? (
          <Loader />
        ) : categories.length === 0 ? (
          <p className="category-list__empty">
            {error
              ? "Categories could not be loaded."
              : "No categories yet. Add one above to organize products."}
          </p>
        ) : (
          <div className="category-table-wrap">
            <table className="category-table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td data-label="Name">{category.name}</td>
                    <td data-label="Description">
                      {category.description || "No description"}
                    </td>
                    <td data-label="Status">
                      <span
                        className={
                          category.isActive
                            ? "category-status"
                            : "category-status category-status--inactive"
                        }
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td data-label="Actions" className="category-table__actions">
                      <Button
                        type="button"
                        className="category-button--secondary"
                        onClick={() => handleEdit(category)}
                        disabled={isSubmitting || Boolean(deletingCategoryId)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        className="category-button--danger"
                        onClick={() => handleDelete(category)}
                        disabled={isSubmitting || Boolean(deletingCategoryId)}
                      >
                        {deletingCategoryId === category._id
                          ? "Deleting..."
                          : "Delete"}
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
  );
}

export default Categories;
