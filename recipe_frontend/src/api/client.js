import axios from "axios";

/**
 * Axios API client configured with environment base URL and auth interceptors.
 * - baseURL: uses REACT_APP_API_BASE_URL if provided, otherwise defaults to http://localhost:3001
 * - Auth: attaches JWT from localStorage key "auth" (shape: { access_token, user })
 */
const baseURL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token from localStorage to every request
api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("auth");
    if (raw) {
      const { access_token } = JSON.parse(raw);
      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
      }
    }
  } catch {
    // ignore parsing errors
  }
  return config;
});

// Handle 401 globally if needed (here we just pass through)
api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Optional: if (error?.response?.status === 401) { ... }
    return Promise.reject(error);
  }
);

export default api;
