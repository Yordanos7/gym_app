// gymapp/backend/src/services/workoutService.ts

import prisma from "../config/db";
import { Workout, WorkoutExercise } from "../../generated/prisma";

// This type defines the structure for an exercise when creating a workout.
// We only need the exercise's ID and the details like sets, reps, etc.
type ExerciseInWorkout = {
  exerciseId: string;
  sets: number;
  reps: number;
  weight?: number;
  order: number;
};

// This is the main type for creating a new workout.
// It includes the workout's name, date, the user it belongs to,
// and an array of the exercises included in it.
export type WorkoutCreationData = {
  name: string;
  date?: Date;
  userId: string;
  exercises: ExerciseInWorkout[];
};

/**
 * Creates a new workout and links its exercises.
 * This is a transactional operation.
 * @param data - The workout data, including the list of exercises.
 */
export const createWorkout = async (
  data: WorkoutCreationData
): Promise<Workout> => {
  const { name, date, userId, exercises } = data;

  // We use prisma.workout.create to start the transaction.
  return prisma.workout.create({
    data: {
      name,
      date,
      userId,
      // This is the key part: we create the related WorkoutExercise records
      // at the same time we create the Workout. Prisma handles the complexity.
      workoutExercises: {
        create: exercises.map((exercise) => ({
          exerciseId: exercise.exerciseId,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: exercise.weight,
          order: exercise.order,
        })),
      },
    },
    // We include the newly created workoutExercises in the response.
    include: {
      workoutExercises: true,
    },
  });
};

/**
 * Retrieves all workouts for a specific user.
 * @param userId - The ID of the user.
 */
export const getWorkoutsByUserId = async (
  userId: string
): Promise<Workout[]> => {
  return prisma.workout.findMany({
    where: { userId },
    // We include all the details of the exercises in each workout.
    include: {
      workoutExercises: {
        include: {
          exercise: true, // Include the full Exercise object
        },
        orderBy: {
          order: "asc", // Ensure exercises are returned in the correct order
        },
      },
    },
    orderBy: {
      date: "desc", // Show the most recent workouts first
    },
  });
};

/**
 * Retrieves a single, detailed workout by its ID.
 * @param id - The ID of the workout.
 */
export const getWorkoutById = async (id: string): Promise<Workout | null> => {
  return prisma.workout.findUnique({
    where: { id },
    include: {
      workoutExercises: {
        include: {
          exercise: true,
        },
        orderBy: {
          order: "asc",
        },
      },
    },
  });
};

/**
 * Deletes a workout.
 * Prisma will automatically handle deleting the associated WorkoutExercise records
 * because of the relation settings in your schema.prisma.
 * @param id - The ID of the workout to delete.
 */
export const deleteWorkout = async (id: string): Promise<Workout> => {
  return prisma.workout.delete({
    where: { id },
  });
};

// Note: Updating a workout with its exercises is a more complex operation.
// It often involves deleting old WorkoutExercise records and creating new ones.
// We can add an `updateWorkout` function later if needed. For now, we'll focus on the core features.
