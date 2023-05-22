import { GraphQLList } from 'graphql';
import { PostType } from '../TypeDefs/Post';
import { PrismaClient, Post } from '@prisma/client';

const prisma = new PrismaClient();

export const GET_POSTS = {
  type: new GraphQLList(PostType),
  resolve: async (): Promise<Post[]> => {
    return prisma.post.findMany({
      include: {
        author: true,
      },
    });
  },
};
