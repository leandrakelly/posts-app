import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { GET_USERS } from './Users/Queries/User';
import { CREATE_USER } from './Users/Mutations/User';

const Query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getUsers: GET_USERS,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: CREATE_USER,
  },
});

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
