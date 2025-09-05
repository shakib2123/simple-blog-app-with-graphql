import DataLoader from "dataloader";
import { prisma } from "..";
import { User } from "../generated/prisma";

const batchUsers = async (ids: number[]): Promise<User[]> => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  const userData: { [key: string]: User } = {};

  users.forEach((user) => {
    userData[user.id] = user;
  });

  return ids.map((id) => {
    const user = userData[id];
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  });
};

//@ts-ignore
export const userLoader = new DataLoader<number, User>(batchUsers);
