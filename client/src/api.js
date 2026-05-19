import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || "/api" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export const authAPI = {
  register: (data) => API.post("/auth/register", data),
  login: (data) => API.post("/auth/login", data),
  getMe: () => API.get("/auth/me"),
};

export const complaintAPI = {
  create: (data) => API.post("/complaints", data),
  getAll: (params) => API.get("/complaints", { params }),
  getById: (id) => API.get(`/complaints/${id}`),
  updateStatus: (id, status) => API.put(`/complaints/${id}`, { status }),
  delete: (id) => API.delete(`/complaints/${id}`),
  search: (location) => API.get("/complaints/search", { params: { location } }),
  saveAIAnalysis: (id, aiAnalysis) => API.put(`/complaints/${id}/ai-analysis`, { aiAnalysis }),
};

export const aiAPI = {
  analyze: (data) => API.post("/ai/analyze", data),
};

export default API;