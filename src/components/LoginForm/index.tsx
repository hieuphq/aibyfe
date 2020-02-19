import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import './index.css';

export interface LoginFormProps extends FormComponentProps {
  onSubmit: (values: { email: string; password: string }) => void;
  signupLink?: string;
  forgotPasswordLink?: string;
}

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends React.Component<LoginFormProps> {
  handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    let username = this.props.form.getFieldValue('username') as string;
    let password = this.props.form.getFieldValue('password') as string;
    this.props.onSubmit({ email: username, password: password });
  }
  componentDidMount() {
    this.props.form.validateFields();
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const usernameError =
      isFieldTouched('username') && getFieldError('username');
    const passwordError =
      isFieldTouched('password') && getFieldError('password');
    return (
      <Form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
        <Form.Item
          validateStatus={usernameError ? 'error' : ''}
          help={usernameError || ''}
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email or Username(admin)"
            />
          )}
        </Form.Item>
        <Form.Item
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href={this.props.forgotPasswordLink}>
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href={this.props.signupLink}>register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create<LoginFormProps>({ name: 'Login Form' })(LoginForm);
