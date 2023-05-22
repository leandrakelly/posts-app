import { Header } from '../../components/common/Header/Header';
import PostForm from '../../components/posts/PostForm/PostForm';
import './PostPage.css';
import { PostList } from '../../components/posts/PostList/PostList';
import ScrollToTopButton from '../../components/common/ScrollToTop/ScrollToTop';
import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
}

export const PostPage = () => {
  const storageUser = localStorage.getItem('user');
  const user: User | null = storageUser ? JSON.parse(storageUser) : null;

  const [refreshPosts, setRefreshPosts] = useState(false);

  useEffect(() => {
    if (refreshPosts) {
      setRefreshPosts(false);
    }
  }, [refreshPosts]);

  return (
    <>
      {user && (
        <div className="container">
          <Header name={user?.name} />
          <div className="content">
            <PostForm
              authorId={user?.id}
              onPostCreated={() => setRefreshPosts(true)}
            />
            <PostList refreshPosts={refreshPosts} />
          </div>
          <ScrollToTopButton />
        </div>
      )}
    </>
  );
};
