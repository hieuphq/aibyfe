import { IUpdatableStore } from '../type';
import { TestSuite, UpdatableListResponse, UpdatableResponse } from 'types/app';
import { appData } from 'generator';

export default class FakeTestSuiteStore implements IUpdatableStore<TestSuite> {
  list(projectId: string): Promise<UpdatableListResponse<TestSuite>> {
    return new Promise<UpdatableListResponse<TestSuite>>((resolve, reject) => {
      resolve({
        data: appData.testSuites.list(itm => {
          return itm.projectId === projectId;
        })
      });
    });
  }
  get(id: string): Promise<UpdatableResponse<TestSuite>> {
    return new Promise<UpdatableResponse<TestSuite>>((resolve, reject) => {
      const itm = appData.testSuites.list(itm => itm.id === id);
      if (itm.length <= 0) {
        reject(new Error('Not found Test suite'));
        return;
      }
      resolve({ data: this.preload(itm[0]) });
    });
  }
  preload(dt: TestSuite): TestSuite {
    const tcIds = appData.testSuiteConnection
      .list(itm => itm.testSuiteId === dt.id)
      .map(itm => itm.testCaseId);
    dt.testCases = appData.testCases.list(itm => tcIds.indexOf(itm.id) >= 0);
    return dt;
  }
  create(data: Partial<TestSuite>): Promise<UpdatableResponse<TestSuite>> {
    return new Promise<UpdatableResponse<TestSuite>>((resolve, reject) => {
      const itm: TestSuite = {
        id: '',
        name: data.name || '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const newItm = appData.testSuites.add(itm);
      if (newItm) {
        reject(new Error('unable to create test suite'));
      }
      resolve({ data: newItm });
    });
  }
  update(data: Partial<TestSuite>): Promise<UpdatableResponse<TestSuite>> {
    return new Promise<UpdatableResponse<TestSuite>>((resolve, reject) => {
      const updated = appData.testSuites.update(data, (old: TestSuite) => {
        return old.id === data.id;
      });

      if (!updated) {
        reject(new Error('Not found'));
        return;
      }

      resolve({ data: updated });
    });
  }
  delete(id: string): Promise<UpdatableResponse<boolean>> {
    return new Promise<UpdatableResponse<boolean>>((resolve, reject) => {
      if (!appData.testSuites.remove(id)) {
        reject(new Error('unable to remove Test suite'));
        return;
      }

      resolve({ data: true });
    });
  }
}
