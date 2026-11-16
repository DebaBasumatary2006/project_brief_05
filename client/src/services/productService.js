import axios from "axios";

const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const api = axios.create({ baseURL: apiBaseUrl });

export async function getProducts({ signal } = {}) {
  const { data } = await api.get("/products", { signal });

  if (!Array.isArray(data.data)) {
    throw new Error("The product API returned an invalid product list.");
  }

  return data.data;
}

export async function createProduct(product) {
  const { data } = await api.post("/products", product);
  return data.data;
}

export async function updateProduct(productId, product) {
  const { data } = await api.put(`/products/${productId}`, product);
  return data.data;
}

export async function deleteProduct(productId) {
  const { data } = await api.delete(`/products/${productId}`);
  return data.data;
}

export function getProductServiceErrorMessage(error, fallbackMessage) {
  if (axios.isAxiosError(error)) {
    const apiMessage = error.response?.data?.message;
    if (typeof apiMessage === "string" && apiMessage.trim()) {
      return apiMessage;
    }

    if (!error.response) {
      return "Unable to reach the product API. Check that the backend is running.";
    }
  }

  return fallbackMessage;
}
