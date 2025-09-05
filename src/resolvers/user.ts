export const User = {
  posts: async (parent: any, args: any, { prisma, userInfo }: any) => {
    const isMyPosts = parent.id === userInfo.userId;
    if (isMyPosts) {
      return await prisma.post.findMany({
        where: {
          authorId: parent.id,
        },
      });
    } else {
      return await prisma.post.findMany({
        where: {
          authorId: parent.id,
          published: true,
        },
      });
    }
  },
};
