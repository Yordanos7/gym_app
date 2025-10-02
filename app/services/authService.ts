// gymapp/app/services/authService.ts
import apiClient from "./apiClient";
import { AuthResponse, User } from "../constants/types"; // Import types

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const registerUser = async (
  email: string,
  password: string,
  name: string
): Promise<User> => {
  try {
    const response = await apiClient.post("/auth/register", {
      email,
      password,
      name,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};
