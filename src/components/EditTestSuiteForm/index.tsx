import React, { useState, useEffect } from 'react';
import { Form, Input, Checkbox, Button, Row, Table, Card } from 'antd';
import { TestCase } from '@types';

export interface EditTestSuiteFormProps {
  submit(values: { name: string; testCases: string[] }): void;
  testcases: TestCase[];
}

type TestCaseState = 'normal' | 'selecting';
type TestCaseView = TestCase & { state: TestCaseState; key: number };
type TestSuiteView = { name: string; testcases: TestCaseView[] };
const emptyView: TestSuiteView = { name: '', testcases: [] };

const EditTestSuiteForm: React.FC<EditTestSuiteFormProps> = ({
  submit,
  testcases
}: EditTestSuiteFormProps) => {
  const [tsuiteView, setTsuiteView] = useState(emptyView);
  const [tcView, setTcView] = useState<TestCaseView[]>([]);
  useEffect(() => {
    const tcviews: TestCaseView[] = testcases.map((itm, index) => {
      return { ...itm, state: 'normal', key: index };
    });
    setTcView(tcviews);
  }, [testcases]);

  const getTestCaseSeletedIds = (): string[] => {
    return tcView.filter(itm => itm.state === 'selecting').map(itm => itm.id);
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
      const newState: TestCaseView[] = tcView.map(itm => {
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
    <Form
      onFinish={values => {
        submit({ name: values.name, testCases: getTestCaseSeletedIds() });
      }}
      fields={[
        { name: 'name', value: tsuiteView.name },
        { name: 'testcases', value: tsuiteView.testcases }
      ]}
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

      <Form.Item label="Test Cases">
        <Form.List name="testcase">
          {fields => {
            return (
              <>
                {fields.map(itm => {
                  const fieldKey = itm.fieldKey;
                  return (
                    <Card size="small">
                      // TODO: leu leu
                      {tsuiteView.testcases[fieldKey].name}
                    </Card>
                  );
                })}
              </>
            );
          }}
        </Form.List>
        {/* <Table
          rowSelection={rowSelection}
          dataSource={tcView}
          columns={columns}
        ></Table> */}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditTestSuiteForm;
