import { client } from "./client";

export const getTasks = async (params) => (await client.get("/tasks", { params })).data;
export const createTask = async (data) => (await client.post("/tasks", data)).data;
export const deleteTask = async (id) => (await client.delete(`/tasks/${id}`)).data;
export const updateTask = async (id, data) => (await client.put(`/tasks/${id}`, data)).data;
export const getAllTasksAdmin = async () => (await client.get("/tasks/allTasks")).data;
export const getAllUsers = async () => (await client.get("/tasks/allUsers")).data;
