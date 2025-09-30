import prisma from "../config/db.ts";
import type { Prisma, Category } from "../../generated/prisma/client.d.ts";
import { PrismaClient } from "../../generated/prisma/client.js";

export type CategoryCreationData = Prisma.CategoryCreateInput;
export type CategoryUpdateData = Prisma.CategoryUpdateInput;

export const createCategory = async (
  data: CategoryCreationData
): Promise<Category> => {
  return prisma.category.create({
    data,
  });
};

export const getCategoriesByUserId = async (
  userId: string
): Promise<Category[]> => {
  return prisma.category.findMany({
    where: { userId },
  });
};

export const getCategoryById = async (id: string): Promise<Category | null> => {
  return prisma.category.findUnique({
    where: { id },
  });
};

export const updateCategory = async (
  id: string,
  data: CategoryUpdateData
): Promise<Category> => {
  return prisma.category.update({
    where: { id },
    data,
  });
};

export const deleteCategory = async (id: string): Promise<Category> => {
  return prisma.category.delete({
    where: { id },
  });
};
