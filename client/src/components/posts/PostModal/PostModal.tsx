import { Alert, Button, Modal, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import {} from 'antd';
import {
  deletePostMutation,
  editPostMutation,
} from '../../../relay/Post/PostMutations';
import { useMutation } from 'react-relay';
import { PayloadError } from 'relay-runtime';

interface PostModalProps {
  visible: boolean;
  onCancel: () => void;
  action: 'edit' | 'delete';
  postId: string;
}

export const PostModal: React.FC<PostModalProps> = ({
  visible,
  onCancel,
  action,
  postId,
}) => {
  const [commitEditPost, isInFlightEditPost] = useMutation(editPostMutation);
  const [commitDeletePost, isInFlightDeletePost] =
    useMutation(deletePostMutation);

  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [error, setError] = useState('');

  useEffect(() => {
    if (action === 'edit') {
      setTitle('Edit');
    } else {
      setTitle('Delete');
      setContent('Are you sure you want to delete your post?');
    }
  }, [action]);

  const resetForm = () => {
    setError('');
    setContent('');
  };

  const handleEditPost = () => {
    form
      .validateFields()
      .then((values) => {
        if (!values.title || !values.content) {
          return;
        }
        commitEditPost({
          variables: {
            postId: postId,
            title: values.title,
            content: values.content,
          },
          onCompleted: (response: {}, errors: PayloadError[] | null) => {
            if (errors && errors.length > 0) {
              form.resetFields();
              setError(errors[0].message);
            } else {
              form.resetFields();
              setError('');
              onCancel();
              messageApi.success('Post edited successfully');
            }
          },
          onError: () => {
            setError('An error occurred while editing the post');
          },
        });
      })
      .catch((info) => {
        return;
      });
  };

  const handleDeletePost = () => {
    commitDeletePost({
      variables: {
        postId: postId,
      },
      onCompleted: (response: {}, errors: PayloadError[] | null) => {
        if (errors && errors.length > 0) {
          setError(errors[0].message);
        } else {
          setError('');
          onCancel();
          messageApi.success('Post deleted successfully');
        }
      },
      onError: () => {
        setError('An error occurred while deleting the post');
      },
    });
  };

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={() => {
        form.resetFields();
        resetForm();
        onCancel();
      }}
      confirmLoading={isInFlightEditPost || isInFlightDeletePost}
      footer={
        action === 'edit'
          ? [
              <Button key="back" onClick={onCancel}>
                Cancel
              </Button>,
              <Button
                key="submit"
                htmlType="submit"
                type="primary"
                onClick={handleEditPost}
              >
                Submit
              </Button>,
            ]
          : [
              <Button key="back" onClick={onCancel}>
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                danger
                onClick={handleDeletePost}
              >
                Delete
              </Button>,
            ]
      }
    >
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          closable
          style={{ marginBottom: 10 }}
        />
      )}
      {contextHolder}
      <p>{content}</p>
      {action === 'edit' && (
        <Form form={form} layout="vertical" onFinish={handleEditPost}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter the title' }]}
          >
            <Input placeholder="Enter the title" />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please enter the content' }]}
          >
            <Input.TextArea placeholder="Enter the content" />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
