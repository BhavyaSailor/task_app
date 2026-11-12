import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE;

const API = axios.create({
  baseURL: `${API_BASE}/api/v1`
});

const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getTasks = async () => {
  const response = await API.get("/tasks", {
    headers: authHeader(),
  });
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await API.post("/tasks", taskData, {
    headers: authHeader(),
  });
  return response.data;
};

export const deleteTask = async(taskId) => {
  const response = await API.delete(`/tasks/${taskId}`, {
    headers : authHeader(),
  });
  return response.data;
}

export const updateTask = async(taskId, updatedData) => {
  const response = await API.put(`/tasks/${taskId}`, updatedData,  {
    headers : authHeader(),
  });
  return response.data;
}

export const getAllTasksAdmin = async () => {
  const response = await API.get("/tasks/allTasks", {
    headers: authHeader(),
  });
  return response.data;
};

export const getAllUsers = async () => {
  const response = await API.get("/tasks/allUsers", {
    headers: authHeader(),
  });
  return response.data;
};

