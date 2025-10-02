// gymapp/app/services/progressService.ts
import apiClient from "./apiClient";
import { Progress } from "../constants/types"; // Import Progress interface

interface CreateProgressPayload {
  weight: number;
  bodyFat?: number;
  muscleMass?: number;
  notes?: string;
}

interface UpdateProgressPayload {
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  notes?: string;
}

export const progressService = {
  /**
   * Fetches all progress entries for the authenticated user.
   * @returns A Promise that resolves to an array of Progress objects.
   */
  async getProgressEntries(): Promise<Progress[]> {
    try {
      const response = await apiClient.get("/progress");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch progress entries"
      );
    }
  },

  /**
   * Creates a new progress entry.
   * @param payload The progress data.
   * @returns A Promise that resolves to the newly created Progress object.
   */
  async createProgressEntry(payload: CreateProgressPayload): Promise<Progress> {
    try {
      const response = await apiClient.post("/progress", payload);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to create progress entry"
      );
    }
  },

  /**
   * Updates an existing progress entry.
   * @param entryId The ID of the progress entry to update.
   * @param payload The updated progress data.
   * @returns A Promise that resolves to the updated Progress object.
   */
  async updateProgressEntry(
    entryId: string,
    payload: UpdateProgressPayload
  ): Promise<Progress> {
    try {
      const response = await apiClient.put(`/progress/${entryId}`, payload);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to update progress entry"
      );
    }
  },

  /**
   * Deletes a progress entry by its ID.
   * @param entryId The ID of the progress entry to delete.
   * @returns A Promise that resolves when the entry is successfully deleted.
   */
  async deleteProgressEntry(entryId: string): Promise<void> {
    try {
      await apiClient.delete(`/progress/${entryId}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to delete progress entry"
      );
    }
  },
};
