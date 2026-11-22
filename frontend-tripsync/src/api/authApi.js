import api from "./client";

export const registerUser = async (payload) =>
  (await api.post("/auth/register", payload)).data;

export const loginUser = async (payload) =>
  (await api.post("/auth/login", payload)).data;

export const changePassword = async (payload) =>
  api.patch("/auth/change-password", payload);
