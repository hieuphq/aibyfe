import React from 'react';
import { Card, Button, Col, Row, Form, Input, Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import {
  StepModel,
  actionList,
  ActionType,
  actionTemplates,
  selectorTypeName,
  SelectorType,
  InputType
} from 'types/step';
import { StepValue } from './StepValue';

export interface StepEmptyProps {
  step: StepModel;
  key: string | number;
  fieldKey: number;
  onChange?: (index: number, step: StepModel) => void;
  onDelete?: (index: number) => void;
}

export const StepEmpty: React.FC<StepEmptyProps> = ({
  fieldKey,
  step,
  onChange,
  onDelete
}) => {
  if (step === undefined) {
    return <></>;
  }

  const key: number = fieldKey;

  const currTemplate = actionTemplates.get(step.type);
  const selectors = currTemplate?.selectors || [];
  const needSelector = selectors.length > 0;
  const needSelectorOptions =
    needSelector && step.selectorType === SelectorType.dynamicXPath;
  const inputType = currTemplate?.inputType || InputType.none;
  const needValue = inputType !== InputType.none;
  return (
    <Card size="small">
      <Row gutter={16}>
        <Col span={22}>
          {step.name !== '' && (
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Name">
                  <span className="ant-form-text">{step.name}</span>
                </Form.Item>
              </Col>
            </Row>
          )}
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Type" name={[key, 'type']}>
                <Select
                  onChange={e => {
                    const seletectedKey = e.toString();
                    const newType: ActionType =
                      ActionType[seletectedKey as keyof typeof ActionType];
                    if (onChange) {
                      onChange(fieldKey, { ...step, type: newType });
                    }
                  }}
                >
                  {actionList.map(itm => (
                    <Select.Option value={itm.key}>{itm.value}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {!needSelector ? null : (
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Selector" name={[key, 'selectorType']}>
                  <Select
                    onChange={e => {
                      const seletectedKey = e.toString();
                      const newType: SelectorType =
                        SelectorType[
                          seletectedKey as keyof typeof SelectorType
                        ];
                      if (onChange) {
                        onChange(fieldKey, { ...step, selectorType: newType });
                      }
                    }}
                  >
                    {selectors.map(itm => (
                      <Select.Option value={itm.toString()}>
                        {selectorTypeName(itm)}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          )}

          {!needSelector ? null : (
            <Row gutter={16}>
              <Col span={needSelectorOptions ? 12 : 24}>
                <Form.Item name={[key, 'selectorValue']}>
                  <Input
                    placeholder="Value"
                    onChange={e => {
                      if (onChange) {
                        onChange(fieldKey, {
                          ...step,
                          selectorValue: e.target.value
                        });
                      }
                    }}
                  />
                </Form.Item>
              </Col>
              {!needSelectorOptions ? null : (
                <Col span={12}>
                  <Form.Item name={[key, 'selectorOpts']}>
                    <Input
                      placeholder="Options"
                      onChange={e => {
                        if (onChange) {
                          onChange(fieldKey, {
                            ...step,
                            selectorOpts: e.target.value
                          });
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>
          )}
          {needValue && (
            <StepValue
              type={inputType.toString()}
              name={[key, 'value']}
              onChange={val => {
                if (onChange) {
                  onChange(fieldKey, {
                    ...step,
                    value: val
                  });
                }
              }}
            />
          )}
        </Col>
        <Col span={2}>
          <Button
            shape="circle"
            size="small"
            icon={<CloseOutlined />}
            onClick={e => {
              if (onDelete) {
                onDelete(fieldKey);
              }
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};
