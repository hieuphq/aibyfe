import React, { useState } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Icon, Form, Input, Checkbox, Button } from 'antd';

export interface SignUpFormProps extends FormComponentProps {
  submit(values: { email: string; password: string }): void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  form,
  submit
}: SignUpFormProps) => {
  const [isDirty, setDirty] = useState(false);
  const { getFieldDecorator } = form;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const email = form.getFieldValue('email') as string;
        const password = form.getFieldValue('password') as string;

        submit({ email, password });
        return;
      }
    });
  };
  const handleConfirmBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDirty(!!value);
  };
  const compareToFirstPassword = (rule: any, value: any, callback: any) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule: any, value: any, callback: any) => {
    if (value && isDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item label="Email">
        {getFieldDecorator('email', {
          rules: [
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your E-mail!'
            }
          ]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
          />
        )}
      </Form.Item>
      <Form.Item label="Password" hasFeedback>
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: 'Please input your password!'
            },
            {
              validator: validateToNextPassword
            }
          ]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item label="Confirm Password" hasFeedback>
        {getFieldDecorator('confirm', {
          rules: [
            {
              required: true,
              message: 'Please confirm your password!'
            },
            {
              validator: compareToFirstPassword
            }
          ]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Retype Password"
            onBlur={handleConfirmBlur}
          />
        )}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        {getFieldDecorator('agreement', {
          valuePropName: 'checked',
          rules: [
            {
              required: true,
              message: 'Please confirm your aggreement!'
            }
          ]
        })(
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        )}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create<SignUpFormProps>({ name: 'Sign up Form' })(
  SignUpForm
);
