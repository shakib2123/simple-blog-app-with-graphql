export const checkUserAccess = async (
  prisma: any,
  userId: any,
  postId: any
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "User not found",
      post: null,
    };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(postId),
    },
  });

  if (!post) {
    return {
      success: false,
      message: "Post not found",
      post: null,
    };
  }

  if (post.authorId !== user.id) {
    return {
      success: false,
      message: "You are not authorized to update this post",
      post: null,
    };
  }
};
