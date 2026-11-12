import { client } from "./client";

export const registerUser = async (data) => (await client.post("/auth/register", data)).data;
export const loginUser = async (data) => (await client.post("/auth/login", data)).data;
export const updateUserRole = async (id, role) =>
  (await client.put(`/auth/users/${id}/role`, { role })).data;
