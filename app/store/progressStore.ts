// gymapp/app/store/progressStore.ts
import { create } from "zustand";
import { Progress } from "../constants/types";
import { progressService } from "../services/progressService"; // Assuming you'll create this service

interface ProgressState {
  progressEntries: Progress[];
  isLoading: boolean;
  error: string | null;

  fetchProgressEntries: () => Promise<void>;
  addProgressEntry: (
    weight: number,
    bodyFat?: number,
    muscleMass?: number,
    notes?: string
  ) => Promise<void>;
  updateProgressEntry: (
    id: string,
    weight?: number,
    bodyFat?: number,
    muscleMass?: number,
    notes?: string
  ) => Promise<void>;
  deleteProgressEntry: (id: string) => Promise<void>;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progressEntries: [],
  isLoading: false,
  error: null,

  fetchProgressEntries: async () => {
    set({ isLoading: true, error: null });
    try {
      const progressEntries = await progressService.getProgressEntries();
      set({ progressEntries, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addProgressEntry: async (weight, bodyFat, muscleMass, notes) => {
    set({ isLoading: true, error: null });
    try {
      const newEntry = await progressService.createProgressEntry({
        weight,
        bodyFat,
        muscleMass,
        notes,
      });
      set((state) => ({
        progressEntries: [...state.progressEntries, newEntry],
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateProgressEntry: async (id, weight, bodyFat, muscleMass, notes) => {
    set({ isLoading: true, error: null });
    try {
      const updatedEntry = await progressService.updateProgressEntry(id, {
        weight,
        bodyFat,
        muscleMass,
        notes,
      });
      set((state) => ({
        progressEntries: state.progressEntries.map((entry) =>
          entry.id === id ? updatedEntry : entry
        ),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  deleteProgressEntry: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await progressService.deleteProgressEntry(id);
      set((state) => ({
        progressEntries: state.progressEntries.filter(
          (entry) => entry.id !== id
        ),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
}));
