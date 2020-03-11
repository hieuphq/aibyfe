import React from 'react';
import { Form, Input, Button } from 'antd';

export interface EditFormProps {
  submit(values: { name: string }): void;
}

const EditForm: React.FC<EditFormProps> = ({ submit }: EditFormProps) => {
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 1,
        offset: 11
      }
    }
  };

  return (
    <Form
      onFinish={values => {
        submit({ name: values.name });
      }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your Test suite name'
          }
        ]}
      >
        <Input placeholder="Name" />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditForm;
