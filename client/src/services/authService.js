import apiClient from "./apiClient";

export async function registerUser(user) {
  const { data } = await apiClient.post("/auth/register", user);
  return data;
}

export async function loginUser(credentials) {
  const { data } = await apiClient.post("/auth/login", credentials);
  return data;
}
