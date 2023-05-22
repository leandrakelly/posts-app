import { GraphQLNonNull, GraphQLString, GraphQLObjectType } from 'graphql';
import { PostType } from '../TypeDefs/Post';
import { PrismaClient, Post } from '@prisma/client';
import { CustomError } from '../../../Errors/CustomError';

const prisma = new PrismaClient();

const DeletePostResponse = new GraphQLObjectType({
  name: 'DeletePostResponse',
  fields: () => ({
    post: { type: PostType },
  }),
});

export const DELETE_POST = {
  type: DeletePostResponse,
  args: {
    postId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (
    _: unknown,
    args: { postId: string },
    context: { headers: { userId: string } },
  ): Promise<{ post: Post | null }> => {
    const { postId } = args;
    const userId = context.headers.userId;

    if (!postId) {
      throw new CustomError('Post ID is required', '400');
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true,
      },
    });

    if (!post) {
      throw new CustomError('Post not found', '404');
    }

    if (post.authorId !== userId) {
      throw new CustomError(
        'Unauthorized: You can only delete your own posts',
        '401',
      );
    }

    try {
      const deletedPost = await prisma.post.delete({
        where: {
          id: postId,
        },
      });

      return {
        post: deletedPost,
      };
    } catch (error: unknown) {
      throw new Error('An error occurred while deleting the post.');
    }
  },
};
