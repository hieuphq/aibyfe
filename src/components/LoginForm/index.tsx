import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import './index.css';
import { useForm, FormInstance } from 'antd/lib/form/util';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export interface LoginFormProps {
  onSubmit: (values: { email: string; password: string }) => void;
  signupLink?: string;
  forgotPasswordLink?: string;
}

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends React.Component<LoginFormProps> {
  form: FormInstance;
  constructor(props: LoginFormProps) {
    super(props);
    [this.form] = useForm();
  }
  // handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
  //   e.preventDefault();
  //   let username = this.props.form.getFieldValue('username') as string;
  //   let password = this.props.form.getFieldValue('password') as string;
  //   this.props.onSubmit({ email: username, password: password });
  // }
  componentDidMount() {
    this.form.validateFields();
  }

  render() {
    // Only show error after a field is touched.
    const usernameError =
      this.form.isFieldTouched('username') &&
      this.form.getFieldError('username');
    const passwordError =
      this.form.isFieldTouched('password') &&
      this.form.getFieldError('password');
    return (
      <Form
        form={this.form}
        className="login-form"
        onFinish={values => {
          this.props.onSubmit({
            email: values.username,
            password: values.password
          });
        }}
      >
        <Form.Item
          validateStatus={usernameError ? 'error' : ''}
          help={usernameError || ''}
          name="username"
          rules={[{ required: true, message: 'Please input your username' }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email or Username(admin)"
          />
        </Form.Item>
        <Form.Item
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
          name="password"
          rules={[{ required: true, message: 'Please input your Password' }]}
        >
          <Input
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Checkbox>Remember me</Checkbox>
          <a className="login-form-forgot" href={this.props.forgotPasswordLink}>
            Forgot password
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(this.form.getFieldsError())}
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
        Or <a href={this.props.signupLink}>register now!</a>
      </Form>
    );
  }
}

export default LoginForm;
