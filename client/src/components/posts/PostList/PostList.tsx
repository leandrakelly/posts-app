import React from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { getPostsQuery } from '../../../relay/Post/PostQueries';
import { PostItem } from '../PostItem/PostItem';
import { PostQueries_getPostsQuery } from '../../../relay/Post/__generated__/PostQueries_getPostsQuery.graphql';
import './PostList.css';

interface Post {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  authorId: string;
  author: {
    name: string;
  };
}

export const PostList = ({ refreshPosts }: { refreshPosts: boolean }) => {
  const data = useLazyLoadQuery<PostQueries_getPostsQuery>(
    getPostsQuery,
    {},
    { fetchPolicy: refreshPosts ? 'network-only' : 'store-or-network' }
  );

  const posts = data?.getPosts as Post[];

  return (
    <div className="post-list">
      {posts && posts.length > 0 ? (
        posts
          .map((post: Post) => <PostItem key={post.id} post={post} />)
          .reverse()
      ) : (
        <div className="no-available">No posts available.</div>
      )}
    </div>
  );
};
