import { GraphQLObjectType, GraphQLString } from 'graphql';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    authorId: { type: GraphQLString },
    author: {
      type: new GraphQLObjectType({
        name: 'PostAuthor',
        fields: () => ({ name: { type: GraphQLString } }),
      }),
      resolve: async (parent) => {
        const author = await prisma.user.findUnique({
          where: {
            id: parent.authorId,
          },
        });
        return author;
      },
    },
  }),
});
