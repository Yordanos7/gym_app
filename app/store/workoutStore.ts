// gymapp/app/store/workoutStore.ts
import { create } from "zustand";
import {
  Workout,
  Exercise,
  WorkoutExercise,
  Category,
} from "../constants/types";
import { workoutService } from "../services/workoutService";
import { exerciseService } from "../services/exerciseService";

interface WorkoutState {
  workouts: Workout[];
  currentWorkout: Workout | null;
  exercises: Exercise[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;

  fetchWorkouts: () => Promise<void>;
  fetchWorkoutById: (id: string) => Promise<void>;
  createWorkout: (
    name: string,
    date?: string,
    exerciseDetails?: Array<{
      exerciseId: string;
      sets: number;
      reps: number;
      weight?: number;
      order: number;
    }>
  ) => Promise<void>;
  updateWorkout: (
    id: string,
    name?: string,
    date?: string,
    exerciseDetails?: Array<{
      workoutExerciseId?: string;
      exerciseId: string;
      sets: number;
      reps: number;
      weight?: number;
      order: number;
    }>
  ) => Promise<void>;
  deleteWorkout: (id: string) => Promise<void>;

  fetchExercises: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  createExercise: (payload: {
    name: string;
    type?: string;
    youtubeUrl?: string;
    notes?: string;
    equipment?: string;
    categoryId?: string;
  }) => Promise<void>;
  createCategory: (name: string) => Promise<void>;
}

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  workouts: [],
  currentWorkout: null,
  exercises: [],
  categories: [],
  isLoading: false,
  error: null,

  fetchWorkouts: async () => {
    set({ isLoading: true, error: null });
    try {
      const workouts = await workoutService.getWorkouts();
      set({ workouts, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchWorkoutById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const currentWorkout = await workoutService.getWorkoutById(id);
      set({ currentWorkout, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  createWorkout: async (name, date, exerciseDetails) => {
    set({ isLoading: true, error: null });
    try {
      const newWorkout = await workoutService.createWorkout({
        name,
        date,
        exercises: exerciseDetails || [],
      });
      set((state) => ({
        workouts: [...state.workouts, newWorkout],
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateWorkout: async (id, name, date, exerciseDetails) => {
    set({ isLoading: true, error: null });
    try {
      const updatedWorkout = await workoutService.updateWorkout(id, {
        name,
        date,
        exercises: exerciseDetails,
      });
      set((state) => ({
        workouts: state.workouts.map((w) => (w.id === id ? updatedWorkout : w)),
        currentWorkout:
          state.currentWorkout?.id === id
            ? updatedWorkout
            : state.currentWorkout,
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  deleteWorkout: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await workoutService.deleteWorkout(id);
      set((state) => ({
        workouts: state.workouts.filter((w) => w.id !== id),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  fetchExercises: async () => {
    set({ isLoading: true, error: null });
    try {
      const exercises = await exerciseService.getExercises();
      set({ exercises, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const categories = await exerciseService.getCategories();
      set({ categories, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  createExercise: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const newExercise = await exerciseService.createExercise(payload);
      set((state) => ({
        exercises: [...state.exercises, newExercise],
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  createCategory: async (name) => {
    set({ isLoading: true, error: null });
    try {
      const newCategory = await exerciseService.createCategory(name);
      set((state) => ({
        categories: [...state.categories, newCategory],
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
}));
