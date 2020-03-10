import { IUpdatableStore } from '../type';
import { TestSuite, UpdatableListResponse, UpdatableResponse } from '@types';
import { post, put, get, remove } from 'util/fetch';
import { Endpoints } from 'constant/endpoint';

export default class TestSuiteStore implements IUpdatableStore<TestSuite> {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  list(
    projectId: string,
    headers?: HeadersInit
  ): Promise<UpdatableListResponse<TestSuite>> {
    return new Promise<UpdatableListResponse<TestSuite>>((resolve, reject) => {
      return get<UpdatableListResponse<TestSuite>>(
        this.baseUrl + Endpoints.TEST_SUITE + '/' + projectId,
        headers
      );
    });
  }

  get(
    id: string,
    headers?: HeadersInit
  ): Promise<UpdatableResponse<TestSuite>> {
    return new Promise<UpdatableResponse<TestSuite>>((resolve, reject) => {
      return get<UpdatableResponse<TestSuite>>(
        this.baseUrl + Endpoints.TEST_SUITE + '/' + id,
        headers
      );
    });
  }

  create(
    data: Partial<TestSuite>,
    headers?: HeadersInit
  ): Promise<UpdatableResponse<TestSuite>> {
    return new Promise<UpdatableResponse<TestSuite>>((resolve, reject) => {
      return post<UpdatableResponse<TestSuite>>(
        this.baseUrl + Endpoints.TEST_SUITE,
        JSON.stringify({ ...data }),
        headers
      );
    });
  }

  update(
    data: Partial<TestSuite>,
    headers?: HeadersInit
  ): Promise<UpdatableResponse<TestSuite>> {
    return new Promise<UpdatableResponse<TestSuite>>((resolve, reject) => {
      return put<UpdatableResponse<TestSuite>>(
        this.baseUrl + Endpoints.TEST_SUITE + '/' + data.id?.toString(),
        JSON.stringify({ ...data }),
        headers
      );
    });
  }

  delete(
    id: string,
    headers?: HeadersInit
  ): Promise<UpdatableResponse<boolean>> {
    return new Promise<UpdatableResponse<boolean>>((resolve, reject) => {
      return remove<UpdatableResponse<boolean>>(
        this.baseUrl + Endpoints.TEST_SUITE + '/' + id,
        headers
      );
    });
  }

  removeTestCase(
    id: string,
    testCaseId: string,
    headers?: HeadersInit
  ): Promise<UpdatableResponse<boolean>> {
    return new Promise<UpdatableResponse<boolean>>((resolve, reject) => {
      remove<UpdatableResponse<boolean>>(
        this.baseUrl + Endpoints.TEST_SUITE + '/' + id + '/' + testCaseId,
        headers
      )
        .then(val => {
          resolve(val);
        })
        .catch(err => {
          reject(new Error(err));
        });
    });
  }

  addTestCase(
    id: string,
    testCaseId: string | string[],
    headers?: HeadersInit
  ): Promise<UpdatableResponse<boolean>> {
    return new Promise<UpdatableResponse<boolean>>((resolve, reject) => {
      let requestList: Promise<UpdatableResponse<boolean>>[] = [];

      const genAddTestCaseRequest = (
        testSuiteId: string,
        testCaseId: string
      ): Promise<UpdatableResponse<boolean>> => {
        return post<UpdatableResponse<boolean>>(
          this.baseUrl +
            Endpoints.TEST_SUITE +
            '/' +
            testSuiteId +
            '/' +
            testCaseId,
          JSON.stringify({ testSuiteId: id, testCaseId }),
          headers
        );
      };
      if (testCaseId as string) {
        requestList.push(genAddTestCaseRequest(id, testCaseId as string));
      } else {
        for (let idx in testCaseId as string[]) {
          requestList.push(genAddTestCaseRequest(id, testCaseId[idx]));
        }
      }
      Promise.all(requestList).then(val => {
        const isFailed = val.map(itm => itm.data).some(itm => itm === false);
        resolve({ data: !isFailed });
      });
    });
  }
}
