export enum ActionType {
  none = '',
  click = 'click',
  inputValue = 'inputValue',
  waitForControl = 'waitForControl',
  navigateTo = 'navigateTo',
  selectDropdown = 'selectDropdown',
  scrollToView = 'scrollToView',
  switchToFrame = 'switchToFrame',
  switchToWindowHandler = 'switchToWindowHandler',
  closeWindow = 'closeWindow',
  evaluateScript = 'evaluateScript',
  sleep = 'sleep',
  checkControlExists = 'checkControlExists',
  checkTextDisplays = 'checkTextDisplays'
}

export function actionTypeName(type: ActionType): string {
  switch (type) {
    case ActionType.none:
      return '';
    case ActionType.click:
      return 'Click';
    case ActionType.inputValue:
      return 'Input Value';
    case ActionType.waitForControl:
      return 'Wait For Control';
    case ActionType.navigateTo:
      return 'Navigate To URL';
    case ActionType.selectDropdown:
      return 'Select Dropdown';
    case ActionType.scrollToView:
      return 'Scroll To View';
    case ActionType.switchToFrame:
      return 'Switch To Frame';
    case ActionType.switchToWindowHandler:
      return 'Switch To Window Handler';
    case ActionType.closeWindow:
      return 'Close Window';
    case ActionType.evaluateScript:
      return 'Evaluate Script';
    case ActionType.sleep:
      return 'Sleep';
    case ActionType.checkControlExists:
      return 'Check Control Exists';
    case ActionType.checkTextDisplays:
      return 'Check Text Displays';
  }
}

export enum SelectorType {
  none = '',
  xpath = 'xpath',
  id = 'id',
  class = 'class',
  dynamicXPath = 'dynamicXPath'
}

export function selectorTypeName(type: SelectorType): string {
  switch (type) {
    case SelectorType.none:
      return '';
    case SelectorType.xpath:
      return 'XPath';
    case SelectorType.id:
      return 'Id';
    case SelectorType.class:
      return 'Class';
    case SelectorType.dynamicXPath:
      return 'Dynamic XPath';
  }
}

export enum InputType {
  none = 'none',
  code = 'code',
  string = 'string',
  number = 'number',
  bool = 'bool'
}
export interface StepTemplate {
  selectors: SelectorType[];
  inputType: InputType;
}

const defaultStringSelectors: SelectorType[] = [
  SelectorType.xpath,
  SelectorType.id,
  SelectorType.class
];

const defaultDynamicStringSelectors: SelectorType[] = [
  SelectorType.xpath,
  SelectorType.id,
  SelectorType.class,
  SelectorType.dynamicXPath
];

export const actionTemplates: Map<ActionType, StepTemplate> = new Map<
  ActionType,
  StepTemplate
>([
  [
    ActionType.click,
    { selectors: defaultDynamicStringSelectors, inputType: InputType.none }
  ],
  [
    ActionType.inputValue,
    { selectors: defaultStringSelectors, inputType: InputType.string }
  ],
  [
    ActionType.waitForControl,
    { selectors: defaultDynamicStringSelectors, inputType: InputType.none }
  ],
  [ActionType.navigateTo, { selectors: [], inputType: InputType.string }],
  [
    ActionType.selectDropdown,
    { selectors: defaultStringSelectors, inputType: InputType.string }
  ],
  [
    ActionType.scrollToView,
    { selectors: defaultStringSelectors, inputType: InputType.none }
  ],
  [
    ActionType.switchToFrame,
    { selectors: defaultStringSelectors, inputType: InputType.none }
  ],
  [
    ActionType.switchToWindowHandler,
    { selectors: [], inputType: InputType.none }
  ],
  [ActionType.closeWindow, { selectors: [], inputType: InputType.none }],
  [ActionType.evaluateScript, { selectors: [], inputType: InputType.code }],
  [ActionType.sleep, { selectors: [], inputType: InputType.number }],
  [
    ActionType.checkControlExists,
    { selectors: defaultDynamicStringSelectors, inputType: InputType.bool }
  ],
  [ActionType.checkTextDisplays, { selectors: [], inputType: InputType.string }]
]);

export interface Step {
  id: string;
  name: string;
  type: string;
  sort: number;
  selectorType: string;
  selectorOpts: string;
  selectorValue: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StepModel {
  id: string;
  name: string;
  type: ActionType;
  sort: number;
  selectorType: SelectorType;
  selectorOpts: string;
  selectorValue: string;
  value: string;
}

const emptyStep: StepModel = {
  id: '',
  name: '',
  type: ActionType.none,
  selectorOpts: '',
  selectorType: SelectorType.none,
  selectorValue: '',
  value: '',
  sort: 0
};

export function initStepModel(dt?: Step): StepModel {
  if (dt) {
    const typeKey = (dt.type as keyof typeof ActionType) || 'none';
    const selectorKey = (dt.type as keyof typeof SelectorType) || 'none';
    return {
      ...dt,
      type: ActionType[typeKey],
      selectorType: SelectorType[selectorKey]
    };
  }

  return emptyStep;
}
const actionTypeKeys = Object.keys(ActionType);
export const actionList: { key: string; value: string }[] = actionTypeKeys
  .map(k => ActionType[k as keyof typeof ActionType])
  .filter(k => k !== ActionType.none)
  .map(val => {
    return { key: val.toString(), value: actionTypeName(val) };
  });

export function generateStepName(step: StepModel): string {
  if (step.type !== undefined && step.type !== ActionType.none) {
    let strs: string[] = [];
    strs.push(actionTypeName(step.type));
    if (
      step.selectorType !== undefined &&
      step.selectorType !== SelectorType.none
    ) {
      strs.push('with');
      switch (step.selectorType) {
        case SelectorType.id:
          strs.push('#' + step.selectorValue);
          break;
        case SelectorType.class:
          strs.push('.' + step.selectorValue);
          break;

        case SelectorType.xpath:
          strs.push('xpath: ' + step.selectorValue);
          break;
        case SelectorType.dynamicXPath:
          strs.push('xpath: ' + step.selectorValue);
          break;
      }
    }

    if (step.value !== '') {
      strs.push(': ' + step.value);
    }

    return strs.join(' ');
  }

  return '';
}
