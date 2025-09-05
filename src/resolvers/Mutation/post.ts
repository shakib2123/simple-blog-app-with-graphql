import { checkUserAccess } from "../../utils/checkUserAccess";

export const postResolvers = {
  addPost: async (parent: any, { post }: any, { prisma, userInfo }: any) => {
    if (!userInfo || !userInfo.userId) {
      return {
        success: false,
        message: "Unauthorized",
        post: null,
      };
    }

    if (!post.title || !post.content) {
      return {
        success: false,
        message: "Title and Content are required",
        post: null,
      };
    }

    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: userInfo.userId,
      },
    });

    return {
      success: true,
      message: "Post created successfully",
      post: newPost,
    };
  },

  updatePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo || !userInfo.userId) {
      return {
        success: false,
        message: "Unauthorized",
        post: null,
      };
    }

    const validation = await checkUserAccess(
      prisma,
      userInfo.userId,
      args.postId
    );

    if (validation) {
      return validation;
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: args.postId,
      },
      data: args.post,
    });

    return {
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    };
  },

  deletePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo || !userInfo.userId) {
      return {
        success: false,
        message: "Unauthorized",
        post: null,
      };
    }

    const validation = await checkUserAccess(
      prisma,
      userInfo.userId,
      args.postId
    );

    if (validation) {
      return validation;
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: parseInt(args.postId),
      },
    });

    return {
      success: true,
      message: "Post deleted successfully",
      post: deletedPost,
    };
  },

  publishPost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo || !userInfo.userId) {
      return {
        success: false,
        message: "Unauthorized",
        post: null,
      };
    }

    const validation = await checkUserAccess(
      prisma,
      userInfo.userId,
      args.postId
    );

    if (validation) {
      return validation;
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: parseInt(args.postId),
      },
      data: {
        published: true,
      },
    });

    return {
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    };
  },
};
