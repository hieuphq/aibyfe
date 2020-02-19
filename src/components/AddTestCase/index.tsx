import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { TestCase } from 'types/app';
import { repo } from 'api';
import { Modal, Table, Icon, Checkbox, Input } from 'antd';

const { Search } = Input;

export interface AddTestCaseProps {
  testSuiteId: string;
  visible?: boolean;
  testCases: TestCase[] | null;
  selectedTestCaseIds: string[] | null;
  onOk: (data: { willSelect: string[]; selected: string[] }) => void;
  onCancel: () => void;
}

type TestCaseView = TestCase & {
  state: 'normal' | 'selected' | 'selecting';
  key: number;
};

export const AddTestCase = ({
  testSuiteId,
  visible,
  onOk,
  onCancel,
  testCases,
  selectedTestCaseIds
}: AddTestCaseProps) => {
  const [tcView, setTcView] = useState<TestCaseView[]>([]);
  useEffect(() => {
    const tcs = testCases || [];
    const stcIds = selectedTestCaseIds || [];
    const tcvs: TestCaseView[] = tcs.map((itm, index) => {
      return {
        ...itm,
        state: stcIds.indexOf(itm.id) < 0 ? 'normal' : 'selected',
        key: index
      };
    });
    setTcView(tcvs);
  }, [testCases, selectedTestCaseIds]);

  const [filterStr, setFilterStr] = useState<string>('');

  // // safe to assume data now exist and you can use data.
  // const mutatedData = React.useMemo(() => {
  //   // if you want to mutate the data for some reason
  //   return data;
  // }, [data]);

  const resetStatus = () => {
    const newTc = [...tcView];
    for (let idx = 0; idx < newTc.length; idx++) {
      newTc[idx].state =
        newTc[idx].state === 'selecting' ? 'normal' : newTc[idx].state;
    }
    setTcView(newTc);
  };
  const onOkHandler = () => {
    const willSelect = tcView
      .filter(itm => itm.state === 'selecting')
      .map(itm => itm.id);
    const selected = tcView
      .filter(itm => itm.state === 'selected')
      .map(itm => itm.id);

    resetStatus();
    onOk({ willSelect, selected });
  };

  const updateCheckStateHandler = (id: string) => {
    const newState = [...tcView];
    const idx = newState.findIndex(itm => itm.id === id);
    if (idx < 0) {
      return;
    }

    let newRowState = newState[idx].state;
    switch (newState[idx].state) {
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
    newState[idx].state = newRowState;
    setTcView(newState);
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
    }
  ];

  const rowSelection = {
    onChange: (
      selectedRowKeys: string[] | number[],
      selectedRows: TestCaseView[]
    ) => {
      const selectedIds = selectedRows.map(r => r.key);
      const newState: TestCaseView[] = tcView.map(itm => {
        const newTcState =
          itm.state === 'selected'
            ? 'selected'
            : selectedIds.findIndex(key => key === itm.key) < 0
            ? 'normal'
            : 'selecting';
        return {
          ...itm,
          state: newTcState
        };
      });
      setTcView(newState);
    },
    getCheckboxProps: (record: TestCaseView) => ({
      disabled: record.state === 'selected',
      name: record.id,
      checked: record.state === 'selecting'
    })
  };

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
        <Table
          rowSelection={rowSelection}
          dataSource={tcView}
          columns={columns}
        ></Table>
      </Modal>
    </>
  );
};
