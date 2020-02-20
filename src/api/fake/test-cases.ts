import { IUpdatableStore } from '../type';
import { TestCase, UpdatableListResponse, UpdatableResponse } from 'types/app';
import { appData } from 'generator';

export default class FakeTestCaseStore implements IUpdatableStore<TestCase> {
  list(projectId: string): Promise<UpdatableListResponse<TestCase>> {
    return new Promise<UpdatableListResponse<TestCase>>((resolve, reject) => {
      if (projectId === '' || projectId === null || projectId === undefined) {
        resolve({
          data: appData.testCases.list()
        });
        return;
      }
      const data = appData.testCases.list(itm => {
        return itm.projectId === projectId;
      });

      resolve({
        data
      });
    });
  }
  listInTestsuite(
    testSuiteId: string
  ): Promise<UpdatableListResponse<TestCase>> {
    return new Promise<UpdatableListResponse<TestCase>>((resolve, reject) => {
      if (
        testSuiteId === '' ||
        testSuiteId === null ||
        testSuiteId === undefined
      ) {
        resolve({
          data: appData.testCases.list()
        });
        return;
      }
      const existed = appData.testSuiteConnection
        .list(itm =>
          testSuiteId !== '' ? itm.testSuiteId === testSuiteId : true
        )
        .map(itm => itm.testCaseId);

      resolve({
        data: appData.testCases.list(itm => {
          return existed.indexOf(itm.id) >= 0;
        })
      });
    });
  }
  get(id: string): Promise<UpdatableResponse<TestCase>> {
    return new Promise<UpdatableResponse<TestCase>>((resolve, reject) => {
      const itm = appData.testCases.list(itm => itm.id === id);

      if (itm.length <= 0) {
        reject(new Error('Not found Test suite'));
        return;
      }
      resolve({ data: itm[0] });
    });
  }
  preload(dt: TestCase): TestCase {
    return dt;
  }
  create(data: Partial<TestCase>): Promise<UpdatableResponse<TestCase>> {
    return new Promise<UpdatableResponse<TestCase>>((resolve, reject) => {
      const itm: TestCase = {
        id: '',
        sort: (appData.testCases.genNextID() as unknown) as number,
        name: data.name || '',
        projectId: data.projectId || '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const newItm = appData.testCases.add(itm);
      if (newItm) {
        reject(new Error('unable to create test suite'));
      }
      resolve({ data: newItm });
    });
  }
  update(data: Partial<TestCase>): Promise<UpdatableResponse<TestCase>> {
    return new Promise<UpdatableResponse<TestCase>>((resolve, reject) => {
      const updated = appData.testCases.update(data, (old: TestCase) => {
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
      // Delete in connection data
      const existed = appData.testSuiteConnection.list(
        itm => itm.testCaseId === id
      );
      for (let idx = 0; idx < existed.length; idx++) {
        const itm = existed[idx];
        appData.testSuiteConnection.remove(itm.id);
      }

      // Delete test case data
      if (!appData.testCases.remove(id)) {
        reject(new Error('unable to remove Test suite'));
        return;
      }

      resolve({ data: true });
    });
  }
}
