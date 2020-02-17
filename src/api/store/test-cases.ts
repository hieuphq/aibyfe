import { IUpdatableStore } from '../type';
import { TestCase, UpdatableListResponse, UpdatableResponse } from 'types/app';
import { post, put, get, remove } from 'util/fetch';
import { Endpoints } from 'constant/endpoint';

export default class TestCaseStore implements IUpdatableStore<TestCase> {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  list(testSuiteId: string): Promise<UpdatableListResponse<TestCase>> {
    return new Promise<UpdatableListResponse<TestCase>>((resolve, reject) => {
      return get<UpdatableListResponse<TestCase>>(
        this.baseUrl + Endpoints.TEST_SUITE + '/' + testSuiteId + '/test-cases'
      );
    });
  }

  get(id: string): Promise<UpdatableResponse<TestCase>> {
    return new Promise<UpdatableResponse<TestCase>>((resolve, reject) => {
      return get<UpdatableResponse<TestCase>>(
        this.baseUrl + Endpoints.TEST_CASE + '/' + id
      );
    });
  }

  create(data: Partial<TestCase>): Promise<UpdatableResponse<TestCase>> {
    return new Promise<UpdatableResponse<TestCase>>((resolve, reject) => {
      return post<UpdatableResponse<TestCase>>(
        this.baseUrl + Endpoints.TEST_CASE,
        JSON.stringify({ ...data })
      );
    });
  }

  update(data: Partial<TestCase>): Promise<UpdatableResponse<TestCase>> {
    return new Promise<UpdatableResponse<TestCase>>((resolve, reject) => {
      return put<UpdatableResponse<TestCase>>(
        this.baseUrl + Endpoints.TEST_CASE + '/' + data.id,
        JSON.stringify({ ...data })
      );
    });
  }

  delete(id: string): Promise<UpdatableResponse<boolean>> {
    return new Promise<UpdatableResponse<boolean>>((resolve, reject) => {
      return remove<UpdatableResponse<boolean>>(
        this.baseUrl + Endpoints.TEST_CASE + '/' + id
      );
    });
  }
}
