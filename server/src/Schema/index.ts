import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { GET_USERS } from './Users/Queries/GetUsers';
import { CREATE_USER } from './Users/Mutations/CreateUser';
import { LOGIN } from './Users/Mutations/Login';
import { GET_USER } from './Users/Queries/GetUser';
import { CREATE_POST } from './Posts/Mutations/CreatePost';
import { EDIT_POST } from './Posts/Mutations/EditPost';
import { DELETE_POST } from './Posts/Mutations/DeletePost';
import { GET_POST } from './Posts/Queries/getPost';
import { GET_POSTS } from './Posts/Queries/getPosts';

const Query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getUsers: GET_USERS,
    getUser: GET_USER,
    getPost: GET_POST,
    getPosts: GET_POSTS,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: CREATE_USER,
    login: LOGIN,
    createPost: CREATE_POST,
    editPost: EDIT_POST,
    deletePost: DELETE_POST,
  },
});

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
