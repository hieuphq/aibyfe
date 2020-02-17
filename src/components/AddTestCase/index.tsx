import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { TestCase } from 'types/app';
import { repo } from 'api';
import { Modal, Table, Icon, Checkbox, Input } from 'antd';

const { Search } = Input;

export interface AddTestCaseProps {
  testSuiteId: string;
  visible?: boolean;
  onOk: (data: { willSelect: string[]; selected: string[] }) => void;
  onCancel: () => void;
}

type TestCaseView = TestCase & {
  state: 'normal' | 'selected' | 'selecting';
};

export const AddTestCase = ({
  testSuiteId,
  visible,
  onOk,
  onCancel
}: AddTestCaseProps) => {
  const { data } = useQuery('get-test-cases', () =>
    repo.getTestCasesForAddingFlow(testSuiteId)
  );

  const [testCases, setTestCases] = useState<TestCaseView[]>([]);
  const [filterStr, setFilterStr] = useState<string>('');

  // // safe to assume data now exist and you can use data.
  // const mutatedData = React.useMemo(() => {
  //   // if you want to mutate the data for some reason
  //   return data;
  // }, [data]);

  useEffect(() => {
    const tcs = data?.data?.testcases || [];
    const stcs = data?.data?.selectedTestcases || [];
    const stcIds = stcs.map(itm => itm.id);
    const tcvs = tcs.map(itm => {
      return {
        ...itm,
        state: stcIds.indexOf(itm.id) <= 0 ? 'normal' : 'selected'
      } as TestCaseView;
    });
    setTestCases(tcvs);
  }, [data]);

  const resetStatus = () => {
    const newTc = [...testCases];
    for (let idx = 0; idx < newTc.length; idx++) {
      newTc[idx].state =
        newTc[idx].state === 'selecting' ? 'normal' : newTc[idx].state;
    }
    setTestCases(newTc);
  };
  const onOkHandler = () => {
    const willSelect = testCases
      .filter(itm => itm.state === 'selecting')
      .map(itm => itm.id);
    const selected = testCases
      .filter(itm => itm.state === 'selected')
      .map(itm => itm.id);

    resetStatus();
    onOk({ willSelect, selected });
  };

  const updateCheckStateHandler = (id: string) => {
    const newState = [...testCases];
    const idx = newState.findIndex(itm => itm.id === id);
    if (idx < 0) {
      return;
    }

    let newRowState = testCases[idx].state;
    switch (testCases[idx].state) {
      case 'selected':
        newRowState = 'selected';
        break;
      case 'normal':
        newRowState = 'selecting';
        break;
      case 'selecting':
        newRowState = 'normal';
        break;
    }
    testCases[idx].state = newRowState;
    setTestCases(testCases);
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
      key: 'name',
      onFilter: (value: string, record: TestCaseView) =>
        record.name.toLowerCase().includes(value),
      filteredValue: [filterStr]
    },
    {
      title: 'Selected',
      dataIndex: 'state',
      key: 'state',
      render: (name: string, data: TestCaseView) => {
        if (name === 'selected') {
          return <Icon type="check"></Icon>;
        }
        return (
          <Checkbox
            defaultChecked={name === 'selecting' ? true : false}
            onChange={() => {
              updateCheckStateHandler(data.id);
            }}
          ></Checkbox>
        );
      }
    }
  ];

  return (
    <>
      <Modal
        title="Add Test Case"
        visible={visible}
        onOk={onOkHandler}
        onCancel={onCancel}
      >
        <div>
          <Search
            placeholder="search test case"
            onChange={value => setFilterStr(value.target.value)}
            style={{ width: 200 }}
          />
        </div>
        <Table dataSource={testCases} columns={columns}></Table>
      </Modal>
    </>
  );
};
