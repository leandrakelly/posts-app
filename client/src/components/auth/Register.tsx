import React, { useState } from 'react';
import { Form, Input, Button, Alert, message } from 'antd';
import { createUserMutation } from '../../relay/User/UserMutations';
import { useMutation } from 'react-relay';
import { Link } from 'react-router-dom';
import { PayloadError } from 'relay-runtime';

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const [commit, isInFlight] = useMutation(createUserMutation);
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values: RegisterFormValues) => {
    commit({
      variables: {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      onCompleted: (response: {}, errors: PayloadError[] | null) => {
        if (errors && errors.length > 0) {
          setError(errors[0].message);
        } else {
          form.resetFields();
          setError('');
          messageApi.success('User created successfully!');
        }
      },
    });
  };

  const handleRegisterClick = () => {
    setError(null);
  };

  return (
    <div className="auth-form">
      {contextHolder}
      <h2>Register</h2>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 10 }}
        />
      )}
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input autoComplete="username" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input autoComplete="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password autoComplete="current-password" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="auth-form-button"
            loading={isInFlight}
            onClick={handleRegisterClick}
          >
            {isInFlight ? 'Registering...' : 'Register'}
          </Button>
        </Form.Item>
      </Form>
      <div>
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </div>
  );
};

export default Register;
