import axios from "axios";
import i18n from "../i18n";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const apiKey = import.meta.env.VITE_API_KEY

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    config.headers["X-Api-Key"] = apiKey;
    const language = i18n.language
    config.headers["Language"] = language;
    
    if (config.requiresAuth) {
      const token = localStorage.getItem("Authorization");

      if (!token) {
        console.warn("Authorization token missing. Aborting request.");
        return Promise.reject({
          message: "Unauthorized: Authorization token missing.",
        });
      }

      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Error in request setup:", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Handle token refresh
    const newToken = response.headers.authorization;

    if (newToken) {
      const tokenWithoutBearer = newToken.startsWith("Bearer ")
        ? newToken.substring(7)
        : newToken;

      localStorage.setItem("Authorization", tokenWithoutBearer);
    }

    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.warn("Unauthorized: Please log in again.");
      } else if (status === 404) {
        console.warn("Resource not found: The requested data does not exist.");
      } else {
        console.warn(`Unexpected error: ${status}`);
      }
    } else {
      console.warn("Network error or server did not respond.");
    }

    return Promise.reject(error.response || "An error occurred");
  }
);

// Helper to create route handlers
const createRoute = (requiresAuth) => ({
  get: (url, config = {}) => api.get(url, { ...config, requiresAuth }),
  post: (url, data, config = {}) => api.post(url, data, { ...config, requiresAuth }),
  put: (url, data, config = {}) => api.put(url, data, { ...config, requiresAuth }),
  delete: (url, config = {}) => api.delete(url, { ...config, requiresAuth }),
});

// Export route and protectedRoute
export const route = createRoute(false); // Public route
export const protectedRoute = createRoute(true); // Protected route
