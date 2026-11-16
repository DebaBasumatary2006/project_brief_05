import apiClient from "./apiClient";

export async function getCategories({ signal } = {}) {
  const { data } = await apiClient.get("/categories", { signal });

  if (!Array.isArray(data.data)) {
    throw new Error("The category API returned an invalid category list.");
  }

  return data.data;
}

export async function getCategoryById(categoryId) {
  const { data } = await apiClient.get(`/categories/${categoryId}`);
  return data.data;
}

export async function createCategory(category) {
  const { data } = await apiClient.post("/categories", category);
  return data.data;
}

export async function updateCategory(categoryId, category) {
  const { data } = await apiClient.put(`/categories/${categoryId}`, category);
  return data.data;
}

export async function deleteCategory(categoryId) {
  const { data } = await apiClient.delete(`/categories/${categoryId}`);
  return data.data;
}
