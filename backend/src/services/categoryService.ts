import prisma from "../config/db";
import { Category } from "../../generated/prisma";

// this is type for doing the tasks ok y

export type CategoryCreationData = {
  name: string;
  userId: string;
};

export type CategoryUpdateData = {
  name?: string;
};

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
