import { graphql } from 'babel-plugin-relay/macro';

export const createPostMutation = graphql`
  mutation PostMutations_createPostMutation(
    $title: String!
    $content: String
    $authorId: String!
  ) {
    createPost(title: $title, content: $content, authorId: $authorId) {
      post {
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
  }
`;

export const editPostMutation = graphql`
  mutation PostMutations_editPostMutation(
    $postId: String!
    $title: String
    $content: String
  ) {
    editPost(postId: $postId, title: $title, content: $content) {
      post {
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
  }
`;

export const deletePostMutation = graphql`
  mutation PostMutations_deletePostMutation($postId: String!) {
    deletePost(postId: $postId) {
      post {
        id
      }
    }
  }
`;
