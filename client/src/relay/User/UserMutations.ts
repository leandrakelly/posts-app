import { graphql } from 'babel-plugin-relay/macro';

export const createUserMutation = graphql`
  mutation UserMutations_createUserMutation(
    $name: String
    $email: String!
    $password: String!
  ) {
    createUser(name: $name, email: $email, password: $password) {
      user {
        id
        email
        name
        createdAt
      }
      token
    }
  }
`;

export const loginMutation = graphql`
  mutation UserMutations_loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        name
        createdAt
      }
      token
    }
  }
`;
