import React, { useState } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/util';

export interface SignUpFormProps {
  submit(values: { email: string; password: string }): void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ submit }: SignUpFormProps) => {
  const [isDirty, setDirty] = useState(false);
  const [form] = useForm();

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
      form.validateFields(['confirm']);
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
    <Form
      form={form}
      onFinish={values => {
        submit({ email: values.email, password: values.password });
      }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!'
          },
          {
            required: true,
            message: 'Please input your E-mail!'
          }
        ]}
      >
        <Input
          prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!'
          },
          {
            validator: validateToNextPassword
          }
        ]}
        hasFeedback
      >
        <Input
          prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirm"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!'
          },
          {
            validator: compareToFirstPassword
          }
        ]}
      >
        <Input
          prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="Retype Password"
          onBlur={handleConfirmBlur}
        />
      </Form.Item>
      <Form.Item
        {...tailFormItemLayout}
        name="agreement"
        rules={[
          {
            required: true,
            message: 'Please confirm your aggreement!'
          }
        ]}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;
