import { Dropdown } from 'antd';
import './PostItem.css';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { PostModal } from '../PostModal/PostModal';

export interface PostItemProps {
  post: {
    id: string;
    title: string;
    content: string;
    updatedAt: string;
    authorId: string;
    author: {
      name: string;
    };
  };
}

export const PostItem = ({ post }: PostItemProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [currentModalAction, setCurrentModalAction] = useState<
    'edit' | 'delete'
  >('edit');

  const localStorageUser = localStorage.getItem('user');
  const userId = localStorageUser ? JSON.parse(localStorageUser).id : null;

  const showDropdown = userId === post.authorId;

  const updatedAtDate = new Date(parseInt(post.updatedAt));
  const patternDateTitle = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const handleMenuClick = (e: any) => {
    if (e.key === 'edit') {
      setCurrentModalAction('edit');
      setIsDropdownVisible(false);
      showModal();
    } else if (e.key === 'delete') {
      setCurrentModalAction('delete');
      setIsDropdownVisible(false);
      showModal();
    }
  };

  const items: MenuProps['items'] = [
    {
      key: 'edit',
      label: 'Edit',
      onClick: handleMenuClick,
    },
    {
      key: 'delete',
      label: 'Delete',
      onClick: handleMenuClick,
    },
  ];

  const handleDropdownVisibleChange = (visible: boolean) => {
    setIsDropdownVisible(visible);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div className="post-item">
      <div className="post-item-header">
        <span className="post-item-author">Author: {post.author?.name}</span>
        <span className="post-details">
          <span
            className="post-date"
            title={patternDateTitle.format(updatedAtDate)}
          >
            {formatDistanceToNow(updatedAtDate)} ago
          </span>
          {showDropdown && (
            <Dropdown
              menu={{ items }}
              open={isDropdownVisible}
              onOpenChange={handleDropdownVisibleChange}
              trigger={['click']}
            >
              <MoreOutlined style={{ fontSize: '20px', marginLeft: '10px' }} />
            </Dropdown>
          )}
        </span>
      </div>
      <h3 className="post-item-title">{post.title}</h3>
      <p className="post-item-content">{post.content}</p>
      <PostModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        action={currentModalAction}
        postId={post.id}
      />
    </div>
  );
};
