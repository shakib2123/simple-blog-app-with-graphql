export const Query = {
  me: (parent: any, args: any, { prisma }: any) => {
    return prisma.user.findUnique({
      where: {
        id: args.id,
      },
    });
  },
  users: (parent: any, args: any, { prisma }: any) => {
    return prisma.user.findMany();
  },
};
