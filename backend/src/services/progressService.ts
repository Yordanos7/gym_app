// gymapp/backend/src/services/progressService.ts

import prisma from "../config/db.ts";
import type { Prisma, Progress } from "../../generated/prisma/client.d.ts";
import { PrismaClient } from "../../generated/prisma/client.js";

export type ProgressCreationData = Prisma.ProgressCreateInput;
export type ProgressUpdateData = Prisma.ProgressUpdateInput;

/**
 * Creates a new progress entry for a user.
 * @param data - The progress data.
 */
export const createProgress = async (
  data: ProgressCreationData
): Promise<Progress> => {
  return prisma.progress.create({
    data,
  });
};

/**
 * Retrieves all progress entries for a specific user.
 * @param userId - The ID of the user.
 */
export const getProgressByUserId = async (
  userId: string
): Promise<Progress[]> => {
  return prisma.progress.findMany({
    where: { userId },
    // Order by date to show a timeline of progress.
    orderBy: {
      date: "desc",
    },
  });
};

/**
 * Retrieves a single progress entry by its ID.
 * @param id - The ID of the progress entry.
 */
export const getProgressById = async (id: string): Promise<Progress | null> => {
  return prisma.progress.findUnique({
    where: { id },
  });
};

/**
 * Updates a progress entry.
 * @param id - The ID of the progress entry to update.
 * @param data - The new data.
 */
export const updateProgress = async (
  id: string,
  data: ProgressUpdateData
): Promise<Progress> => {
  return prisma.progress.update({
    where: { id },
    data,
  });
};

/**
 * Deletes a progress entry.
 * @param id - The ID of the progress entry to delete.
 */
export const deleteProgress = async (id: string): Promise<Progress> => {
  return prisma.progress.delete({
    where: { id },
  });
};
