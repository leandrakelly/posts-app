import { GraphQLNonNull, GraphQLString, GraphQLObjectType } from 'graphql';
import { PostType } from '../TypeDefs/Post';
import { PrismaClient, Post } from '@prisma/client';
import { CustomError } from '../../../Errors/CustomError';

const prisma = new PrismaClient();

const EditPostResponseType = new GraphQLObjectType({
  name: 'EditPostResponse',
  fields: {
    post: { type: PostType },
  },
});

export const EDIT_POST = {
  type: EditPostResponseType,
  args: {
    postId: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  },
  resolve: async (
    _: unknown,
    args: { postId: string; title?: string; content?: string },
    context: { headers: { userId: string } },
  ): Promise<{ post: Post | null }> => {
    const { postId, title, content } = args;
    const userId = context.headers.userId;

    if (!postId || (!title && !content)) {
      throw new CustomError(
        'Post ID and at least one field to update are required',
        '400',
      );
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
        'Unauthorized: You can only edit your own posts',
        '401',
      );
    }

    try {
      const updatedPost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          title: title || post.title,
          content: content || post.content,
        },
      });

      return {
        post: updatedPost,
      };
    } catch (error: unknown) {
      throw new Error('An error occurred while updating the post.');
    }
  },
};
