import { GraphQLNonNull, GraphQLString } from 'graphql';
import { PostType } from '../TypeDefs/Post';
import { Post, PrismaClient } from '@prisma/client';
import { CustomError } from '../../../Errors/CustomError';

const prisma = new PrismaClient();

export const GET_POST = {
  type: PostType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  async resolve(_: unknown, { id }: { id: string }): Promise<Post | null> {
    try {
      if (!id || id.trim() === '') {
        throw new CustomError('Post ID is required', '400');
      }

      const post = await prisma.post.findUnique({
        where: {
          id,
        },
      });

      if (!post) {
        throw new CustomError('Post not found', '404');
      }

      return post;
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError('Internal server error', '500');
    }
  },
};
