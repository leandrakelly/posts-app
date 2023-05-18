import { GraphQLNonNull, GraphQLString } from 'graphql';
import { UserType } from '../TypeDefs/User';

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(parent: any, args: any) {
    const { name, email, password } = args;
    return args;
  },
};
