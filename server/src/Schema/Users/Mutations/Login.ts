import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
  GraphQLError,
} from 'graphql';
import { UserType } from '../TypeDefs/User';
import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CustomError } from '../../../Errors/CustomError';

const prisma = new PrismaClient();
type UserWithToken = Omit<User, 'password'>;

const LoginResponseType = new GraphQLObjectType({
  name: 'LoginResponse',
  fields: {
    user: { type: UserType },
    token: { type: GraphQLString },
  },
});

export const LOGIN = {
  type: LoginResponseType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (
    _: unknown,
    args: { email: string; password: string },
  ): Promise<{
    user: UserWithToken | null;
    token: string | null;
  }> => {
    try {
      const { email, password } = args;

      if (!email || !password) {
        throw new GraphQLError('Email and password are required');
      }

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new CustomError('Invalid email or password', '401');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new CustomError('Invalid email or password', '401');
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: '3h',
        },
      );

      return {
        user,
        token,
      };
    } catch (error: unknown) {
      if (error instanceof GraphQLError) {
        throw error;
      }
      throw error;
    }
  },
};
