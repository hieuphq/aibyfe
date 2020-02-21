import { IUpdatableStore } from '../type';
import { TestCase, UpdatableListResponse, UpdatableResponse } from '@types';
import { post, put, get, remove } from 'util/fetch';
import { Endpoints } from 'constant/endpoint';

export default class TestCaseStore implements IUpdatableStore<TestCase> {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  listInTestsuite(
    testSuiteId: string,
    headers?: HeadersInit
  ): Promise<UpdatableListResponse<TestCase>> {
    return new Promise<UpdatableListResponse<TestCase>>((resolve, reject) => {
      return get<UpdatableListResponse<TestCase>>(
        this.baseUrl + Endpoints.TEST_SUITE + '/' + testSuiteId + '/test-cases',
        headers
      );
    });
  }

  list(
    projectId: string,
    headers?: HeadersInit
  ): Promise<UpdatableListResponse<TestCase>> {
    return new Promise<UpdatableListResponse<TestCase>>((resolve, reject) => {
      return get<UpdatableListResponse<TestCase>>(
        this.baseUrl + Endpoints.PROJECT + '/' + projectId + '/test-cases',
        headers
      );
    });
  }

  get(id: string, headers?: HeadersInit): Promise<UpdatableResponse<TestCase>> {
    return new Promise<UpdatableResponse<TestCase>>((resolve, reject) => {
      return get<UpdatableResponse<TestCase>>(
        this.baseUrl + Endpoints.TEST_CASE + '/' + id,
        headers
      );
    });
  }

  create(
    data: Partial<TestCase>,
    headers?: HeadersInit
  ): Promise<UpdatableResponse<TestCase>> {
    return new Promise<UpdatableResponse<TestCase>>((resolve, reject) => {
      return post<UpdatableResponse<TestCase>>(
        this.baseUrl + Endpoints.TEST_CASE,
        JSON.stringify({ ...data }),
        headers
      );
    });
  }

  update(
    data: Partial<TestCase>,
    headers?: HeadersInit
  ): Promise<UpdatableResponse<TestCase>> {
    return new Promise<UpdatableResponse<TestCase>>((resolve, reject) => {
      return put<UpdatableResponse<TestCase>>(
        this.baseUrl + Endpoints.TEST_CASE + '/' + data.id,
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
        this.baseUrl + Endpoints.TEST_CASE + '/' + id,
        headers
      );
    });
  }
}
