import prisma from "../config/db";
import { User } from "../../generated/prisma";
import bcrypt from "bcryptjs";

// this is the custom type for make the action on the database  the custome is the way to represent the data in the data base
export type UserCreationData = Omit<User, "id" | "createdAt" | "updatedAt">; // use omit to create the user as the model ok
export type UserUpdateData = Partial<UserCreationData>;

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
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  return prisma.user.update({
    where: { id: id },
    data: data,
  });
};
// and this is for deleteing the user
export const deleteUser = async (id: string): Promise<User> => {
  return prisma.user.delete({
    where: { id: id },
  });
};
