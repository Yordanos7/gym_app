// gymapp/app/services/userService.ts
import apiClient from "./apiClient";
import { User } from "../constants/types"; // Import User interface

interface UserProfileUpdate {
  name?: string;
  age?: number;
  goals?: string;
}

export const userService = {
  /**
   * Fetches the profile of the currently authenticated user.
   * @returns A Promise that resolves to the User object.
   */
  async getMyProfile(): Promise<User> {
    try {
      const response = await apiClient.get("/users/me");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch user profile"
      );
    }
  },

  /**
   * Fetches a user profile by ID.
   * @param userId The ID of the user to fetch.
   * @returns A Promise that resolves to the User object.
   */
  async getUserProfile(userId: string): Promise<User> {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch user profile"
      );
    }
  },

  /**
   * Updates the profile of a specific user.
   * @param userId The ID of the user to update.
   * @param updates An object containing the fields to update (name, age, goals).
   * @returns A Promise that resolves to the updated User object.
   */
  async updateUserProfile(
    userId: string,
    updates: UserProfileUpdate
  ): Promise<User> {
    try {
      const response = await apiClient.put(`/users/${userId}`, updates);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to update user profile"
      );
    }
  },

  /**
   * Deletes a user account.
   * @param userId The ID of the user to delete.
   * @returns A Promise that resolves when the user is successfully deleted.
   */
  async deleteUser(userId: string): Promise<void> {
    try {
      await apiClient.delete(`/users/${userId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to delete user");
    }
  },
};
