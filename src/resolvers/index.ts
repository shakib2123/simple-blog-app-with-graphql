import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/jwtHelper";
import config from "../config";

const prisma = new PrismaClient();

interface userInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const resolvers = {
  // Query resolvers
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
  // mutation resolvers
  Mutation: {
    signup: async (parent: any, args: userInfo, context: any) => {
      const isUserExist = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });

      if (isUserExist) {
        return {
          success: false,
          message: "User already exists",
          token: null,
        };
      }

      const hashedPassword = await bcrypt.hash(args.password, 12);

      const newUser = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashedPassword,
        },
      });

      if (args.bio) {
        await prisma.profile.create({
          data: {
            bio: args.bio,
            userId: newUser.id,
          },
        });
      }

      const token = await generateToken(
        { userId: newUser.id },
        config.jwt.secret as string
      );

      return {
        success: true,
        message: "User created successfully",
        token,
      };
    },

    signin: async (
      parent: any,
      args: { email: string; password: string },
      context: any
    ) => {
      const user = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });

      if (!user) {
        return {
          success: false,
          message: "User not found",
          token: null,
        };
      }

      const isValidPassword = await bcrypt.compare(
        args.password,
        user.password
      );

      if (!isValidPassword) {
        return {
          success: false,
          message: "Invalid Password",
          token: null,
        };
      }

      const token = await generateToken(
        {
          userId: user.id,
        },
        config.jwt.secret as string
      );

      return {
        success: true,
        message: "User signed in successfully",
        token,
      };
    },
  },
};
