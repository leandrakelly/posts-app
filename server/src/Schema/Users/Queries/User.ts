import { GraphQLList } from 'graphql';
import { UserType } from '../TypeDefs/User';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const GET_USERS = {
  type: new GraphQLList(UserType),
  resolve(): any {
    return prisma.user.findMany();
  },
};
