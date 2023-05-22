import { GraphQLNonNull, GraphQLString } from 'graphql';
import { UserType } from '../TypeDefs/User';
import { PrismaClient, User } from '@prisma/client';
import { CustomError } from '../../../Errors/CustomError';

const prisma = new PrismaClient();

export const GET_USER = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_: unknown, { id }: { id: string }): Promise<User | null> => {
    try {
      if (!id || id.trim() === '') {
        throw new CustomError('User ID is required', '400');
      }

      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          posts: true,
        },
      });

      if (!user) {
        throw new CustomError('User not found', '404');
      }

      return user;
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError('Internal server error', '500');
    }
  },
};
