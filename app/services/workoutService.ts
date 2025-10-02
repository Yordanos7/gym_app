// gymapp/app/services/workoutService.ts
import apiClient from "./apiClient";
import { Workout, WorkoutExercise } from "../constants/types"; // Import types

interface CreateWorkoutPayload {
  name: string;
  date?: string;
  exercises: Array<{
    exerciseId: string;
    sets: number;
    reps: number;
    weight?: number;
    order: number;
  }>;
}

interface UpdateWorkoutPayload {
  name?: string;
  date?: string;
  exercises?: Array<{
    workoutExerciseId?: string; // Optional for existing workout exercises
    exerciseId: string;
    sets: number;
    reps: number;
    weight?: number;
    order: number;
  }>;
}

export const workoutService = {
  /**
   * Fetches all workouts for the authenticated user.
   * @returns A Promise that resolves to an array of Workout objects.
   */
  async getWorkouts(): Promise<Workout[]> {
    try {
      const response = await apiClient.get("/workouts");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch workouts"
      );
    }
  },

  /**
   * Fetches a single workout by its ID.
   * @param workoutId The ID of the workout to fetch.
   * @returns A Promise that resolves to a Workout object.
   */
  async getWorkoutById(workoutId: string): Promise<Workout> {
    try {
      const response = await apiClient.get(`/workouts/${workoutId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch workout"
      );
    }
  },

  /**
   * Creates a new workout.
   * @param payload The workout data, including exercises.
   * @returns A Promise that resolves to the newly created Workout object.
   */
  async createWorkout(payload: CreateWorkoutPayload): Promise<Workout> {
    try {
      const response = await apiClient.post("/workouts", payload);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to create workout"
      );
    }
  },

  /**
   * Updates an existing workout.
   * @param workoutId The ID of the workout to update.
   * @param payload The updated workout data.
   * @returns A Promise that resolves to the updated Workout object.
   */
  async updateWorkout(
    workoutId: string,
    payload: UpdateWorkoutPayload
  ): Promise<Workout> {
    try {
      const response = await apiClient.put(`/workouts/${workoutId}`, payload);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to update workout"
      );
    }
  },

  /**
   * Deletes a workout by its ID.
   * @param workoutId The ID of the workout to delete.
   * @returns A Promise that resolves when the workout is successfully deleted.
   */
  async deleteWorkout(workoutId: string): Promise<void> {
    try {
      await apiClient.delete(`/workouts/${workoutId}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to delete workout"
      );
    }
  },

  /**
   * Records a session for a specific workout exercise.
   * This might be used to track sets/reps/weight for a specific exercise within a workout.
   * Note: This assumes a backend endpoint for recording session data.
   * The backend schema has WorkoutExercise, which could be updated or a new Progress entry could be made.
   * For simplicity, this example assumes updating an existing WorkoutExercise or creating a new one.
   * A more robust solution might involve a dedicated 'Session' model.
   */
  async recordWorkoutExerciseSession(
    workoutExerciseId: string,
    updates: { sets?: number; reps?: number; weight?: number }
  ): Promise<WorkoutExercise> {
    try {
      const response = await apiClient.put(
        `/workout-exercises/${workoutExerciseId}`,
        updates
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to record workout exercise session"
      );
    }
  },
};
