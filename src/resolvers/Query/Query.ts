export const Query = {
  me: (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo || !userInfo.userId) {
      return null;
    }

    return prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });
  },
  profile: async (parent: any, args: any, { prisma }: any) => {
    console.log(args);
    return await prisma.profile.findUnique({
      where: {
        userId: parseInt(args.userId),
      },
    });
  },
  users: (parent: any, args: any, { prisma }: any) => {
    return prisma.user.findMany();
  },
  posts: (parent: any, args: any, { prisma }: any) => {
    return prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  },
};
