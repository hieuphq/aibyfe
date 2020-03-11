import React, { useState } from 'react';
import {
  Action,
  initActionModel,
  ActionModel,
  CreateAction
} from 'types/action';
import { Form, Input, Row, Button, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { StepEditableForm } from 'components/StepForm';
import { initStepModel, StepModel, generateStepName } from 'types/step';
import { useMutation } from 'react-query';
import { repo } from 'api';

export interface CreateActionFormProps {
  action?: Action;
  onSuccess: () => void;
  pageId: string;
}

export const CreateActionForm: React.FC<CreateActionFormProps> = ({
  action,
  onSuccess,
  pageId
}) => {
  const [currAction, setCurrAction] = useState(initActionModel(action));
  const isEditing = !(action === null);
  const [createAction] = useMutation((dt: ActionModel) => {
    console.log(dt);
    const raw: CreateAction = {
      name: dt.name,
      pageId: pageId,
      sort: 0,
      steps: dt.steps
    };
    return repo.createAction(raw);
  });

  return (
    <Form
      layout="vertical"
      onFinish={async values => {
        try {
          await createAction(currAction);
          setCurrAction(initActionModel(action));
          onSuccess();
        } catch (err) {
          console.log(err);
        }
      }}
      fields={[
        { name: 'name', value: currAction.name },
        { name: 'steps', value: currAction.steps }
      ]}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Name is required' }]}
          >
            <Input
              onChange={e => {
                setCurrAction({ ...currAction, name: e.target.value });
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.List name="steps">
            {fields => (
              <div style={{ minWidth: '100%' }}>
                {fields.map(fld => {
                  return (
                    <StepEditableForm
                      {...fld}
                      key={fld.fieldKey}
                      step={currAction.steps[fld.fieldKey]}
                      onChange={(index: number, step: StepModel) => {
                        let newSteps = [...currAction.steps];
                        const name = generateStepName(step);
                        newSteps[index] = { ...step, name };
                        setCurrAction({ ...currAction, steps: newSteps });
                      }}
                      onDelete={(index: number) => {
                        let newSteps = [...currAction.steps];
                        newSteps.splice(index, 1);
                        setCurrAction({ ...currAction, steps: newSteps });
                      }}
                    />
                  );
                })}
                <Form.Item>
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      setCurrAction({
                        ...currAction,
                        steps: [...currAction.steps, initStepModel()]
                      });
                    }}
                    style={{ width: '100%' }}
                  >
                    Add Step
                  </Button>
                </Form.Item>
              </div>
            )}
          </Form.List>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
