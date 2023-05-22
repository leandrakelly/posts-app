import { GraphQLNonNull, GraphQLString, GraphQLObjectType } from 'graphql';
import { UserType } from '../TypeDefs/User';
import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CustomError } from '../../../Errors/CustomError';

const prisma = new PrismaClient();
type UserWithoutPassword = Omit<User, 'password'>;

const CreateUserResponseType = new GraphQLObjectType({
  name: 'CreateUserResponse',
  fields: {
    user: { type: UserType },
    token: { type: GraphQLString },
  },
});

export const CREATE_USER = {
  type: CreateUserResponseType,
  args: {
    name: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (
    _: unknown,
    args: User,
  ): Promise<{
    user: UserWithoutPassword | null;
    token: string | null;
  }> => {
    const { name, email, password } = args;

    if (!email || !password) {
      throw new CustomError('Email and password are required', '400');
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new CustomError('Email already exists', '409');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

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
      if (error instanceof CustomError) {
        throw error;
      }
      throw new Error('An error occurred while creating the user.');
    }
  },
};
