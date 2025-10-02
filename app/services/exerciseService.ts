// gymapp/app/services/exerciseService.ts
import apiClient from "./apiClient";
import { Exercise, Category } from "../constants/types"; // Import types

interface CreateExercisePayload {
  name: string;
  type?: string;
  youtubeUrl?: string;
  notes?: string;
  equipment?: string;
  categoryId?: string;
}

interface UpdateExercisePayload {
  name?: string;
  type?: string;
  youtubeUrl?: string;
  notes?: string;
  equipment?: string;
  categoryId?: string;
}

export const exerciseService = {
  /**
   * Fetches all exercises for the authenticated user.
   * @returns A Promise that resolves to an array of Exercise objects.
   */
  async getExercises(): Promise<Exercise[]> {
    try {
      const response = await apiClient.get("/exercises");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch exercises"
      );
    }
  },

  /**
   * Fetches a single exercise by its ID.
   * @param exerciseId The ID of the exercise to fetch.
   * @returns A Promise that resolves to an Exercise object.
   */
  async getExerciseById(exerciseId: string): Promise<Exercise> {
    try {
      const response = await apiClient.get(`/exercises/${exerciseId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch exercise"
      );
    }
  },

  /**
   * Creates a new exercise.
   * @param payload The exercise data.
   * @returns A Promise that resolves to the newly created Exercise object.
   */
  async createExercise(payload: CreateExercisePayload): Promise<Exercise> {
    try {
      const response = await apiClient.post("/exercises", payload);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to create exercise"
      );
    }
  },

  /**
   * Updates an existing exercise.
   * @param exerciseId The ID of the exercise to update.
   * @param payload The updated exercise data.
   * @returns A Promise that resolves to the updated Exercise object.
   */
  async updateExercise(
    exerciseId: string,
    payload: UpdateExercisePayload
  ): Promise<Exercise> {
    try {
      const response = await apiClient.put(`/exercises/${exerciseId}`, payload);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to update exercise"
      );
    }
  },

  /**
   * Deletes an exercise by its ID.
   * @param exerciseId The ID of the exercise to delete.
   * @returns A Promise that resolves when the exercise is successfully deleted.
   */
  async deleteExercise(exerciseId: string): Promise<void> {
    try {
      await apiClient.delete(`/exercises/${exerciseId}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to delete exercise"
      );
    }
  },

  /**
   * Fetches all categories for exercises.
   * @returns A Promise that resolves to an array of Category objects.
   */
  async getCategories(): Promise<Category[]> {
    try {
      const response = await apiClient.get("/categories");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  },

  /**
   * Creates a new category.
   * @param name The name of the category.
   * @returns A Promise that resolves to the newly created Category object.
   */
  async createCategory(name: string): Promise<Category> {
    try {
      const response = await apiClient.post("/categories", { name });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to create category"
      );
    }
  },
};
