import axios from "axios";

const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const apiClient = axios.create({ baseURL: apiBaseUrl });

export function getApiErrorMessage(error, fallbackMessage) {
  if (axios.isAxiosError(error)) {
    const apiMessage = error.response?.data?.message;
    if (typeof apiMessage === "string" && apiMessage.trim()) {
      return apiMessage;
    }

    if (!error.response) {
      return "Unable to reach the API. Check that the backend is running.";
    }
  }

  return fallbackMessage;
}

export default apiClient;
