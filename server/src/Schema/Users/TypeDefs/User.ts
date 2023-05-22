import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { PostType } from '../../Posts/TypeDefs/Post';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    name: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (parent) => {
        const userPosts = await prisma.post.findMany({
          where: {
            authorId: parent.id,
          },
        });
        return userPosts;
      },
    },
  }),
});
