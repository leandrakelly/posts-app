import { GraphQLList } from 'graphql';
import { UserType } from '../TypeDefs/User';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();
export const GET_USERS = {
  type: new GraphQLList(UserType),
  resolve(): Promise<User[]> {
    return prisma.user.findMany({
      include: {
        posts: true,
      },
    });
  },
};
