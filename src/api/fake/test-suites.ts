import { IUpdatableStore } from '../type';
import { TestSuite, UpdatableListResponse, UpdatableResponse } from 'types/app';

let testSuites: TestSuite[] = [
  {
    id: '1',
    name: 'Regression Main feature',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Smoke Test',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'UAT March 2020',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
let nextId = 3;

export default class FakeTestSuiteStore implements IUpdatableStore<TestSuite> {
  list(): Promise<UpdatableListResponse<TestSuite>> {
    return new Promise<UpdatableListResponse<TestSuite>>((resolve, reject) => {
      resolve({ data: testSuites });
    });
  }
  get(id: string): Promise<UpdatableResponse<TestSuite>> {
    return new Promise<UpdatableResponse<TestSuite>>((resolve, reject) => {
      const itm = testSuites.find(item => item.id === id);
      resolve({ data: itm });
    });
  }
  create(data: Partial<TestSuite>): Promise<UpdatableResponse<TestSuite>> {
    return new Promise<UpdatableResponse<TestSuite>>((resolve, reject) => {
      nextId = nextId++;
      const newItm = {
        id: nextId.toString(),
        name: data.name || '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      testSuites = [...testSuites, newItm];
      resolve({ data: newItm });
    });
  }
  update(data: Partial<TestSuite>): Promise<UpdatableResponse<TestSuite>> {
    return new Promise<UpdatableResponse<TestSuite>>((resolve, reject) => {
      const idx = testSuites.findIndex(item => item.id === data.id);

      if (idx < 0) {
        reject(new Error('Not found'));
        return;
      }

      const itm = testSuites[idx];
      const newItm = Object.assign({}, itm, data);
      testSuites[idx] = newItm;
      resolve({ data: newItm });
    });
  }
}
