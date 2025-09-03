import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface userInfo {
  name: string;
  email: string;
  password: string;
}

export const resolvers = {
  Query: {
    me: (parent: any, args: any, context: any) => {
      return prisma.user.findUnique({
        where: {
          id: args.id,
        },
      });
    },
    users: (parent: any, args: any, context: any) => {
      return prisma.user.findMany();
    },
  },
  Mutation: {
    signup: async (parent: any, args: userInfo, context: any) => {
      const hashedPassword = await bcrypt.hash(args.password, 12);

      const newUser = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashedPassword,
        },
      });

      const token = jwt.sign(
        {
          userId: newUser.id,
        },
        "secret",
        { expiresIn: "1d" }
      );

      return {
        success: true,
        message: "User created successfully",
        token,
      };
    },
  },
};
