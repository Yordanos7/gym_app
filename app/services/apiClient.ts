// gymapp/app/services/apiClient.ts
import axios from "axios";
import * as SecureStore from "expo-secure-store";

// Determine the API base URL based on the environment
// For Expo Go, you might need to use your local IP address
// For production, use your deployed backend URL
const API_BASE_URL = "http://localhost:5000/api"; // Replace with your backend URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the auth token to headers
apiClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors (e.g., token expiration)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // You can add logic here to handle specific error codes, e.g., 401 for unauthorized
    // For example, if token expires, you might want to log the user out
    if (error.response && error.response.status === 401) {
      // Optionally, clear token and redirect to login
      await SecureStore.deleteItemAsync("userToken");
      await SecureStore.deleteItemAsync("userData");
      // You might need a way to trigger a global logout/navigation to login screen
      // This often involves a global state or navigation ref
      console.warn("Authentication expired or invalid. User logged out.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
