import prisma from "../config/db.ts";
import { Prisma, User } from "../../generated/prisma/client.js";
import bcrypt from "bcryptjs";

export type UserCreationData = Prisma.UserCreateInput;
export type UserUpdateData = Prisma.UserUpdateInput;

export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany();
};

export const getUserById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id: id },
  });
};

// for create the user
export const createUser = async (data: UserCreationData): Promise<User> => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
};

// here i update the user data partialy
export const updateUser = async (
  id: string,
  data: UserUpdateData
): Promise<User> => {
  const updateData: Prisma.UserUpdateInput = { ...data };

  if (typeof updateData.password === "string") {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  return prisma.user.update({
    where: { id: id },
    data: updateData,
  });
};
// and this is for deleteing the user
export const deleteUser = async (id: string): Promise<User> => {
  return prisma.user.delete({
    where: { id: id },
  });
};
