import { Prisma, PrismaClient, User } from "../../generated/prisma";

const prisma = new PrismaClient();

export const findUserById = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      password: true,
      age: true,
      goals: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
};

export const updateUser = async (
  id: string,
  data: { name?: string; email?: string }
) => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      password: true,
      age: true,
      goals: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return updatedUser;
};
