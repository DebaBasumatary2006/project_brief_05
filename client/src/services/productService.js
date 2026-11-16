import apiClient, { getApiErrorMessage } from "./apiClient";

export async function getProducts({ signal } = {}) {
  const { data } = await apiClient.get("/products", { signal });

  if (!Array.isArray(data.data)) {
    throw new Error("The product API returned an invalid product list.");
  }

  return data.data;
}

export async function createProduct(product) {
  const { data } = await apiClient.post("/products", product);
  return data.data;
}

export async function updateProduct(productId, product) {
  const { data } = await apiClient.put(`/products/${productId}`, product);
  return data.data;
}

export async function deleteProduct(productId) {
  const { data } = await apiClient.delete(`/products/${productId}`);
  return data.data;
}

export function getProductServiceErrorMessage(error, fallbackMessage) {
  return getApiErrorMessage(error, fallbackMessage);
}
