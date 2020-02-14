import { IUpdatableStore } from '../type';
import { TestSuite, UpdatableListResponse, UpdatableResponse } from 'types/app';
import { post, put, get } from 'util/fetch';
import { Endpoints } from 'constant/endpoint';

export default class TestSuiteStore implements IUpdatableStore<TestSuite> {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  list(): Promise<UpdatableListResponse<TestSuite>> {
    return new Promise<UpdatableListResponse<TestSuite>>((resolve, reject) => {
      return get<UpdatableListResponse<TestSuite>>(
        this.baseUrl + Endpoints.TEST_SUITE + '/'
      );
    });
  }

  get(id: string): Promise<UpdatableResponse<TestSuite>> {
    return new Promise<UpdatableResponse<TestSuite>>((resolve, reject) => {
      return get<UpdatableResponse<TestSuite>>(
        this.baseUrl + Endpoints.TEST_SUITE + '/' + id
      );
    });
  }

  create(data: Partial<TestSuite>): Promise<UpdatableResponse<TestSuite>> {
    return new Promise<UpdatableResponse<TestSuite>>((resolve, reject) => {
      return post<UpdatableResponse<TestSuite>>(
        this.baseUrl + Endpoints.TEST_SUITE,
        JSON.stringify({ ...data })
      );
    });
  }

  update(data: Partial<TestSuite>): Promise<UpdatableResponse<TestSuite>> {
    return new Promise<UpdatableResponse<TestSuite>>((resolve, reject) => {
      return put<UpdatableResponse<TestSuite>>(
        this.baseUrl + Endpoints.TEST_SUITE + '/' + data.id?.toString(),
        JSON.stringify({ ...data })
      );
    });
  }
}
