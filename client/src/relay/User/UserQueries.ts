import { graphql } from 'babel-plugin-relay/macro';

const UserQueries = {
  getUsers: graphql`
    query UserQueries_getUsersQuery {
      getUsers {
        id
        email
        name
        posts {
          id
          title
          content
          createdAt
        }
      }
    }
  `,
};

export default UserQueries;
