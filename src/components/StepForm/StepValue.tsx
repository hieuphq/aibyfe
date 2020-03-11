import React from 'react';
import { Row, Col, Form, Input, InputNumber } from 'antd';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';

export interface StepValueForm {
  label?: string;
  name: any[];
  type: string;
  onChange: (value: string) => void;
}

declare type ChildrenType = React.ReactElement | React.ReactElement[] | null;

export const StepValue: React.FC<StepValueForm> = ({
  label,
  name,
  onChange,
  type
}) => {
  const input = (type: string): ChildrenType => {
    switch (type) {
      case 'number':
        return (
          <InputNumber
            min={1}
            onChange={e => {
              onChange(e?.toString() || '1');
            }}
          />
        );
      case 'code':
        return (
          <AceEditor
            style={{ width: '100%', maxHeight: '200px' }}
            mode="javascript"
            theme="github"
            onChange={e => {
              onChange(e.toString());
            }}
            editorProps={{ $blockScrolling: true }}
          />
        );
      default:
        return (
          <Input
            onChange={e => {
              onChange(e.target.value);
            }}
          />
        );
    }
  };
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item label={label || 'Value'} name={name}>
          {input(type)}
        </Form.Item>
      </Col>
    </Row>
  );
};
