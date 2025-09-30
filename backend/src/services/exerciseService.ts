// gymapp/backend/src/services/exerciseService.ts

import prisma from "../config/db.ts";
import type { Prisma, Exercise } from "../../generated/prisma/client.d.ts";
import { PrismaClient } from "../../generated/prisma/client.js";

export type ExerciseCreationData = Prisma.ExerciseCreateInput;
export type ExerciseUpdateData = Prisma.ExerciseUpdateInput;

/**
 * Creates a new exercise.
 * @param data - The exercise's data.
 */
export const createExercise = async (
  data: ExerciseCreationData
): Promise<Exercise> => {
  return prisma.exercise.create({
    data,
  });
};

/**
 * Retrieves all exercises created by a specific user.
 * This allows a user to see their list of custom exercises.
 * @param userId - The ID of the user.
 */
export const getExercisesByUserId = async (
  userId: string
): Promise<Exercise[]> => {
  return prisma.exercise.findMany({
    where: { userId },
    // We include the related category's name in the result.
    // This is useful for displaying the category on the frontend.
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
};

/**
 * Retrieves a single exercise by its ID.
 * @param id - The ID of the exercise.
 */
export const getExerciseById = async (id: string): Promise<Exercise | null> => {
  return prisma.exercise.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
};

/**
 * Updates an existing exercise.
 * @param id - The ID of the exercise to update.
 * @param data - The new data for the exercise.
 */
export const updateExercise = async (
  id: string,
  data: ExerciseUpdateData
): Promise<Exercise> => {
  return prisma.exercise.update({
    where: { id },
    data,
  });
};

/**
 * Deletes an exercise.
 * @param id - The ID of the exercise to delete.
 */
export const deleteExercise = async (id: string): Promise<Exercise> => {
  return prisma.exercise.delete({
    where: { id },
  });
};
