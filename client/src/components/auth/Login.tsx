import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { loginMutation } from '../../relay/User/UserMutations';
import { useMutation } from 'react-relay';
import { Link, useNavigate } from 'react-router-dom';
import { PayloadError } from 'relay-runtime';

interface LoginFormValues {
  email: string;
  password: string;
}

export const Login = () => {
  const [commit, isInFlight] = useMutation(loginMutation);
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const onFinish = (values: LoginFormValues) => {
    commit({
      variables: {
        email: values.email,
        password: values.password,
      },
      onCompleted: (response: any, errors: PayloadError[] | null) => {
        if (errors && errors.length > 0) {
          setError(errors[0].message);
        } else {
          localStorage.setItem('token', response.login.token);
          localStorage.setItem('user', JSON.stringify(response.login.user));
          form.resetFields();
          navigate('/posts');
        }
      },
    });
  };

  const handleLoginClick = () => {
    setError(null);
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
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
            data-testid="login-button"
            htmlType="submit"
            className="auth-form-button"
            loading={isInFlight}
            onClick={handleLoginClick}
          >
            {isInFlight ? 'Logining...' : 'Login'}
          </Button>
        </Form.Item>
      </Form>
      <div>
        Need an account? <Link to="/register">Register here</Link>
      </div>
    </div>
  );
};
