import { GraphQLNonNull, GraphQLString, GraphQLObjectType } from 'graphql';
import { PrismaClient, Post } from '@prisma/client';
import { CustomError } from '../../../Errors/CustomError';
import { PostType } from '../TypeDefs/Post';

const prisma = new PrismaClient();

const CreatePostResponseType = new GraphQLObjectType({
  name: 'CreatePostResponse',
  fields: {
    post: { type: PostType },
  },
});

export const CREATE_POST = {
  type: CreatePostResponseType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: GraphQLString },
    authorId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (
    _: unknown,
    args: { title: string; content?: string; authorId: string },
  ): Promise<{ post: Post | null }> => {
    const { title, content, authorId } = args;

    if (!title || !authorId) {
      throw new CustomError('Title and author ID are required', '400');
    }

    const userExists = await prisma.user.findUnique({
      where: {
        id: authorId,
      },
    });

    if (!userExists) {
      throw new CustomError('Author not found', '404');
    }

    try {
      const post = await prisma.post.create({
        data: {
          title,
          content,
          author: {
            connect: { id: authorId },
          },
        },
      });

      return {
        post,
      };
    } catch (error: unknown) {
      throw new Error('An error occurred while creating the post.');
    }
  },
};
