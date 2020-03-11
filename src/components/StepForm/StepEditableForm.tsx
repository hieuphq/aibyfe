import React, { useState } from 'react';
import { StepModel, ActionType } from 'types/step';
import { StepEmpty } from '.';

export interface StepEditableFormProps {
  key: string | number;
  fieldKey: number;
  step: StepModel;
  onChange?: (index: number, step: StepModel) => void;
  onDelete?: (index: number) => void;
}

export const StepEditableForm: React.FC<StepEditableFormProps> = ({
  step,
  key,
  fieldKey,
  onChange,
  onDelete
}) => {
  return (
    <StepEmpty
      key={fieldKey}
      fieldKey={fieldKey}
      step={step}
      onDelete={onDelete}
      onChange={onChange}
    />
  );

  // switch (step.type) {
  //   case ActionType.none:
  //     return (
  //       <StepEmpty
  //         key={key}
  //         fieldKey={fieldKey}
  //         step={step}
  //         onDelete={onDelete}
  //         onChange={onChange}
  //       />
  //     );

  //   case ActionType.closeWindow:
  //     return (
  //       <>
  //         <h1>StepWITHOUTSelectorWithoutValue</h1>
  //         return{' '}
  //         <StepEmpty
  //           key={key}
  //           fieldKey={fieldKey}
  //           step={step}
  //           onChange={onChange}
  //         />
  //         ;
  //       </>
  //     );
  //   case ActionType.checkTextDisplays:
  //   case ActionType.navigateTo:
  //     return <>StepWITHOUTSelectorWithValue</>;
  //   case ActionType.evaluateScript:
  //     return <>StepWITHOUTSelectorWithCode</>;
  //   case ActionType.sleep:
  //     return <>StepWITHOUTSelectorWithNumber</>;
  //   case ActionType.click:
  //   case ActionType.scrollToView:
  //   case ActionType.waitForControl:
  //   case ActionType.switchToFrame:
  //   case ActionType.switchToWindowHandler:
  //     return <>StepWithSelectorWithoutValue</>;
  //   case ActionType.inputValue:
  //   case ActionType.selectDropdown:
  //     return <>StepWithSelectorWithString</>;
  //   case ActionType.checkControlExists:
  //     return <>StepWithSelectorWithBoolean</>;
  // }
};
