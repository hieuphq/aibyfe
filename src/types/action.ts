import { StepModel, Step, initStepModel } from './step';

export interface Action {
  id: string;
  name: string;
  pageId: string;
  sort: number;
  steps?: Step[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PagesActions {
  id: string;
  pageId: string;
  actionId: string;
}
export interface ActionsSteps {
  id: string;
  actionId: string;
  stepId: string;
}

export interface CreateAction {
  name: string;
  pageId: string;
  sort: number;
  steps: StepModel[];
}

export interface UpdateAction {
  id: string;
  name: string;
  pageId: string;
  sort: number;
  steps?: Step[];
}

export interface ActionModel {
  id: string;
  name: string;
  pageId: string;
  sort: number;
  steps: StepModel[];
}

const emptyAction: ActionModel = {
  id: '',
  name: '',
  pageId: '',
  sort: 0,
  steps: []
};

export function initActionModel(dt?: Action): ActionModel {
  if (dt) {
    const steps = dt?.steps || [];
    return {
      id: dt.id,
      name: dt.name,
      pageId: dt.pageId,
      sort: dt.sort,
      steps: steps.map(itm => initStepModel(itm))
    };
  }

  return emptyAction;
}
