import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE;

const API = axios.create({
    baseURL: `${API_BASE}/api`
})

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

