import React, { useState, useEffect } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Icon, Form, Input, Checkbox, Button, Row, Table } from 'antd';
import { TestCase } from 'types/app';

export interface EditTestSuiteFormProps extends FormComponentProps {
  submit(values: { name: string; testCases: string[] }): void;
  testcases: TestCase[];
}

type TestCaseState = 'normal' | 'selecting';
type TestCaseView = TestCase & { state: TestCaseState; key: number };

const EditTestSuiteForm: React.FC<EditTestSuiteFormProps> = ({
  form,
  submit,
  testcases
}: EditTestSuiteFormProps) => {
  const [tcview, setTcView] = useState<TestCaseView[]>([]);
  useEffect(() => {
    const tcviews: TestCaseView[] = testcases.map((itm, index) => {
      return { ...itm, state: 'normal', key: index };
    });
    setTcView(tcviews);
  }, [testcases]);
  const { getFieldDecorator } = form;

  const getTestCaseSeletedIds = (): string[] => {
    return tcview.filter(itm => itm.state === 'selecting').map(itm => itm.id);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    }
  ];
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const name = form.getFieldValue('name') as string;

        submit({ name, testCases: getTestCaseSeletedIds() });
        return;
      }
    });
  };

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

  const rowSelection = {
    onChange: (
      selectedRowKeys: string[] | number[],
      selectedRows: TestCaseView[]
    ) => {
      const selectedIds = selectedRows.map(r => r.key);
      const newState: TestCaseView[] = tcview.map(itm => {
        return {
          ...itm,
          state:
            selectedIds.findIndex(key => key === itm.key) < 0
              ? 'normal'
              : 'selecting'
        };
      });
      setTcView(newState);
    },
    getCheckboxProps: (record: TestCaseView) => ({
      name: record.id
    })
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item label="Name">
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: 'Please input your Test suite name'
            }
          ]
        })(<Input placeholder="Name" />)}
      </Form.Item>

      <Form.Item label="Test Cases">
        <Table
          rowSelection={rowSelection}
          dataSource={tcview}
          columns={columns}
        ></Table>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create<EditTestSuiteFormProps>({
  name: 'Create test suite form'
})(EditTestSuiteForm);
