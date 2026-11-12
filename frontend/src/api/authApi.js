import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE;

const API = axios.create({
    baseURL: `${API_BASE}/api/v1`
})

const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const registerUser = async (userData) =>{
    const response = await API.post(
      "/auth/register" ,
      userData
    );
    return response.data;
}

export const loginUser = async (userData) => {

  const response = await API.post(
    "/auth/login",
    userData
  );
  
  return response.data;
};

export const updateUserRole = async (userId, role) => {
  const response = await API.put(`/auth/users/${userId}/role`, { role }, {
    headers: authHeader(),
  });
  return response.data;
};

