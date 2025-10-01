// gymapp/app/constants/types.ts

// Mirrors the User model in Prisma
export interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  goals?: string;
  createdAt: string; // Dates are typically strings from API
  updatedAt: string;
}

// Mirrors the Category model in Prisma
export interface Category {
  id: string;
  name: string;
  userId: string;
}

// Mirrors the Exercise model in Prisma
export interface Exercise {
  id: string;
  name: string;
  type?: string;
  youtubeUrl?: string;
  notes?: string;
  equipment?: string;
  userId: string;
  categoryId?: string;
}

// Mirrors the Workout model in Prisma
export interface Workout {
  id: string;
  name: string;
  date?: string; // Dates are typically strings from API
  userId: string;
  workoutExercises?: WorkoutExercise[]; // Optional, for when exercises are loaded with the workout
}

// Mirrors the WorkoutExercise model in Prisma (junction table)
export interface WorkoutExercise {
  id: string;
  workoutId: string;
  exerciseId: string;
  sets: number;
  reps: number;
  weight?: number;
  order: number;
  exercise?: Exercise; // Optional, for when exercise details are loaded with workoutExercise
}

// Mirrors the Progress model in Prisma
export interface Progress {
  id: string;
  userId: string;
  date: string; // Dates are typically strings from API
  weight: number;
  bodyFat?: number;
  muscleMass?: number;
  notes?: string;
}

// API Response types
export interface AuthResponse {
  user: User;
  token: string;
}

export interface ErrorResponse {
  message: string;
}
