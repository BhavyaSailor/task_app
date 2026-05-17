import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
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
  console.log("taskApi getTasks response:", response.data);
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await API.post("/tasks", taskData, {
    headers: authHeader(),
  });
  console.log("taskApi createTask response:", response.data);
  return response.data;
};