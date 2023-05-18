import { GraphQLList } from 'graphql';
import { UserType } from '../TypeDefs/User';

// get all users using prisma
export const GET_USERS = {
  type: new GraphQLList(UserType),
  resolve(): any {
    return [];
  },
};
