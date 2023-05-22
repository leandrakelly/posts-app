import { graphql } from 'babel-plugin-relay/macro';

export const getPostsQuery = graphql`
  query PostQueries_getPostsQuery {
    getPosts {
      id
      title
      content
      updatedAt
      authorId
      author {
        name
      }
    }
  }
`;
