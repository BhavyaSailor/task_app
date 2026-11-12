import axios from "axios";

export const clearSession = () =>
  ["token", "userEmail", "userRole"].forEach((k) => localStorage.removeItem(k));

export const errMsg = (e, fallback) =>
  e.response?.data?.errors?.[0]?.msg || e.response?.data?.message || fallback;

export const client = axios.create({ baseURL: `${import.meta.env.VITE_API_BASE}/api/v1` });

client.interceptors.request.use((c) => {
  const t = localStorage.getItem("token");
  if (t) c.headers.Authorization = `Bearer ${t}`;
  return c;
});

client.interceptors.response.use(
  (r) => r,
  (e) => {
    if (e.response?.status === 401 && localStorage.getItem("token")) {
      clearSession();
      window.location.href = "/login?expired=1";
    }
    return Promise.reject(e);
  }
);
