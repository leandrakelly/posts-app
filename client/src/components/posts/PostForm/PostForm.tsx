import React, { useState } from 'react';
import { Form, Input, Button, Alert, message } from 'antd';
import { createPostMutation } from '../../../relay/Post/PostMutations';
import { useMutation } from 'react-relay';
import './PostForm.css';
import { PayloadError } from 'relay-runtime';

interface PostFormProps {
  authorId: string;
  onPostCreated: () => void;
}

interface PostFormValues {
  title: string;
  content: string;
}

const PostForm: React.FC<PostFormProps> = ({ authorId, onPostCreated }) => {
  const [commit, isInFlight] = useMutation(createPostMutation);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [error, setError] = useState('');

  const onFinish = (values: PostFormValues) => {
    commit({
      variables: {
        title: values.title,
        authorId,
        content: values.content,
      },
      onCompleted: (response: {}, errors: PayloadError[] | null) => {
        if (errors && errors.length > 0) {
          setError(errors[0].message);
        } else {
          form.resetFields();
          setError('');
          messageApi.success('Post created successfully!');
          if (onPostCreated) {
            onPostCreated();
          }
        }
      },
      onError: () => {
        setError('An error occurred while creating the post');
      },
    });
  };

  return (
    <div className="post-form">
      {contextHolder}
      <h2>Create Post</h2>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          closable
          style={{ marginBottom: 10 }}
        />
      )}
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Please enter the title' }]}
        >
          <Input placeholder="Enter the title" />
        </Form.Item>
        <Form.Item name="content">
          <Input.TextArea placeholder="Enter the content" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="post-form-button"
            loading={isInFlight}
          >
            {isInFlight ? 'Creating...' : 'Create'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PostForm;
