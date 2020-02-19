import { IUpdatableStore } from '../type';
import {
  TestSuite,
  UpdatableListResponse,
  UpdatableResponse,
  CreateTestSuite,
  TestCase
} from 'types/app';
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
  create(data: CreateTestSuite): Promise<UpdatableResponse<TestSuite>> {
    return new Promise<UpdatableResponse<TestSuite>>((resolve, reject) => {
      const itm: TestSuite = {
        id: '',
        name: data.name || '',
        projectId: data.projectId,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const newItm = appData.testSuites.add(itm);
      if (!newItm) {
        reject(new Error('unable to create test suite'));
        return;
      }

      const nItm = (newItm as unknown) as TestSuite;
      const tcs = data.testCases || [];
      const testSuiteId = nItm.id || '';
      let tcData: TestCase[] = [];
      for (let idx = 0; idx < tcs.length; idx++) {
        const testCaseId = tcs[idx];
        const tc = appData.testCases.getById(testCaseId);
        if (!tc) {
          continue;
        }

        const cs = appData.testSuiteConnection.list(
          itm =>
            itm.testCaseId === testCaseId && itm.testSuiteId === testSuiteId
        );
        if (cs.length > 0) {
          continue;
        }
        appData.testSuiteConnection.add({ id: '', testSuiteId, testCaseId });
        tcData.push(tc);
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

  removeTestCase(
    id: string,
    testCaseId: string
  ): Promise<UpdatableResponse<boolean>> {
    return new Promise<UpdatableResponse<boolean>>((resolve, reject) => {
      const existed = appData.testSuiteConnection.list(
        itm => itm.testSuiteId === id && itm.testCaseId === testCaseId
      );
      for (let idx = 0; idx < existed.length; idx++) {
        const itm = existed[idx];
        appData.testSuiteConnection.remove(itm.id);
      }

      resolve({ data: true });
    });
  }

  addTestCase(
    testSuiteId: string,
    testCaseId: string
  ): Promise<UpdatableResponse<boolean>> {
    return new Promise<UpdatableResponse<boolean>>((resolve, reject) => {
      const ts = appData.testSuites.list(itm => itm.id === testSuiteId);
      if (ts.length <= 0) {
        reject(new Error('invalid test suite'));
        return;
      }
      appData.testSuiteConnection.add({ id: '', testCaseId, testSuiteId });

      resolve({ data: true });
    });
  }
}
