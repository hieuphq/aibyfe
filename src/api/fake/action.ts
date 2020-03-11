import { IUpdatableStore } from '../type';
import { UpdatableListResponse, UpdatableResponse } from 'types';
import { DataFactory } from 'generator';
import { decodeToken } from './token';
import {
  Action,
  CreateAction,
  UpdateAction,
  ActionsSteps,
  PagesActions
} from 'types/action';
import { Step } from 'types/step';

export default class FakeActionStore implements IUpdatableStore<Action> {
  list(
    pageId: string,
    headers?: HeadersInit
  ): Promise<UpdatableListResponse<Action>> {
    return new Promise<UpdatableListResponse<Action>>((resolve, reject) => {
      const appData = DataFactory.getInstance().appData();
      if (pageId === '') {
        resolve({
          data: appData.actions.list()
        });
        return;
      }
      const existed = appData.pageActions
        .list(itm => itm.pageId === pageId)
        .map(itm => itm.actionId);

      resolve({
        data: appData.actions.list(itm => {
          return existed.indexOf(itm.id) >= 0;
        })
      });
    });
  }
  get(id: string): Promise<UpdatableResponse<Action>> {
    return new Promise<UpdatableResponse<Action>>((resolve, reject) => {
      const appData = DataFactory.getInstance().appData();
      const itm = appData.actions.list(itm => itm.id === id);
      if (itm.length <= 0) {
        reject(new Error('Not found action'));
        return;
      }
      resolve({ data: this.preload(itm[0]) });
    });
  }
  preload(dt: Action): Action {
    return dt;
  }
  create(data: CreateAction): Promise<UpdatableResponse<Action>> {
    return new Promise<UpdatableResponse<Action>>((resolve, reject) => {
      const appData = DataFactory.getInstance().appData();

      // Create steps
      let newSteps: Step[] = [];
      for (let idx in data.steps) {
        const s = data.steps[idx];
        const sRaw: Step = {
          id: '',
          name: s.name,
          type: s.type,
          sort: s.sort,
          selectorType: s.selectorType,
          selectorOpts: s.selectorOpts,
          selectorValue: s.selectorValue,
          value: s.value,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        const sNew = appData.steps.add(sRaw);
        if (sNew) {
          newSteps.push(sNew);
        }
      }

      // Create action
      const actionRaw: Action = {
        id: '',
        pageId: data.pageId,
        sort: data.sort,
        name: data.name || '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const newAction = appData.actions.add(actionRaw);
      if (!newAction) {
        reject(new Error('unable to create test suite'));
      }

      // Create page actions connection
      const pageActionRaw: PagesActions = {
        id: '',
        pageId: data.pageId,
        actionId: newAction?.id || ''
      };
      appData.pageActions.add(pageActionRaw);

      // Create steps action connection
      for (let idx in newSteps) {
        const s = newSteps[idx];
        const cRaw: ActionsSteps = {
          id: '',
          actionId: newAction?.id || '',
          stepId: s.id
        };
        appData.actionSteps.add(cRaw);
      }

      // Create
      DataFactory.getInstance().setAppData(appData);

      if (newAction) {
        newAction.steps = newSteps;
      }
      resolve({ data: newAction });
    });
  }
  update(data: UpdateAction): Promise<UpdatableResponse<Action>> {
    return new Promise<UpdatableResponse<Action>>((resolve, reject) => {
      const appData = DataFactory.getInstance().appData();

      if (data.steps) {
        // need remove all steps and connection
        const deleteConnIds = appData.actionSteps
          .list(itm => itm.actionId === data.id)
          .map(itm => itm.id);
        const deleteStepIds = appData.actionSteps
          .list(itm => itm.actionId === data.id)
          .map(itm => itm.stepId);

        for (let idx in deleteConnIds) {
          appData.actionSteps.remove(deleteConnIds[idx]);
        }

        for (let idx in deleteStepIds) {
          appData.steps.remove(deleteStepIds[idx]);
        }

        // add step again guy
        // Create steps
        let newSteps: Step[] = [];
        for (let idx in data.steps) {
          const s = data.steps[idx];
          const sRaw: Step = {
            id: '',
            name: s.name,
            type: s.type,
            sort: s.sort,
            selectorType: s.selectorType,
            selectorOpts: s.selectorOpts,
            selectorValue: s.selectorValue,
            value: s.value,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          const sNew = appData.steps.add(sRaw);
          if (sNew) {
            newSteps.push(sNew);
          }
        }
        // Create steps action connection
        for (let idx in newSteps) {
          const s = newSteps[idx];
          const cRaw: ActionsSteps = {
            id: '',
            actionId: data.id,
            stepId: s.id
          };
          appData.actionSteps.add(cRaw);
        }
      }
      const updated = appData.actions.update(data, (old: Action) => {
        return old.id === data.id;
      });

      if (!updated) {
        reject(new Error('Not found'));
        return;
      }
      DataFactory.getInstance().setAppData(appData);
      resolve({ data: updated });
    });
  }
  delete(id: string): Promise<UpdatableResponse<boolean>> {
    return new Promise<UpdatableResponse<boolean>>((resolve, reject) => {
      // Delete in connection data
      const appData = DataFactory.getInstance().appData();

      // need remove all steps and connection
      const deleteConnIds = appData.actionSteps
        .list(itm => itm.actionId === id)
        .map(itm => itm.id);
      const deleteStepIds = appData.actionSteps
        .list(itm => itm.actionId === id)
        .map(itm => itm.stepId);

      for (let idx in deleteConnIds) {
        appData.actionSteps.remove(deleteConnIds[idx]);
      }

      for (let idx in deleteStepIds) {
        appData.steps.remove(deleteStepIds[idx]);
      }

      const existed = appData.actionSteps.list(itm => itm.actionId === id);
      for (let idx = 0; idx < existed.length; idx++) {
        const itm = existed[idx];
        appData.actionSteps.remove(itm.id);
      }

      // Delete test case data
      if (!appData.actions.remove(id)) {
        reject(new Error('unable to remove Test suite'));
        return;
      }
      DataFactory.getInstance().setAppData(appData);
      resolve({ data: true });
    });
  }
}
