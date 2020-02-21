import { IUpdatableStore } from '../type';
import { Page, UpdatableListResponse, UpdatableResponse } from '@types';
import { post, put, get, remove } from 'util/fetch';
import { Endpoints } from 'constant/endpoint';

export default class PagesStore implements IUpdatableStore<Page> {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  list(
    projectId: string,
    headers?: HeadersInit
  ): Promise<UpdatableListResponse<Page>> {
    return new Promise<UpdatableListResponse<Page>>((resolve, reject) => {
      return get<UpdatableListResponse<Page>>(
        this.baseUrl + Endpoints.PROJECT + '/' + projectId + '/pages',
        headers
      );
    });
  }

  get(id: string, headers?: HeadersInit): Promise<UpdatableResponse<Page>> {
    return new Promise<UpdatableResponse<Page>>((resolve, reject) => {
      return get<UpdatableResponse<Page>>(
        this.baseUrl + Endpoints.PAGE + '/' + id,
        headers
      );
    });
  }

  create(
    data: Partial<Page>,
    headers?: HeadersInit
  ): Promise<UpdatableResponse<Page>> {
    return new Promise<UpdatableResponse<Page>>((resolve, reject) => {
      return post<UpdatableResponse<Page>>(
        this.baseUrl + Endpoints.PAGE,
        JSON.stringify({ ...data }),
        headers
      );
    });
  }

  update(
    data: Partial<Page>,
    headers?: HeadersInit
  ): Promise<UpdatableResponse<Page>> {
    return new Promise<UpdatableResponse<Page>>((resolve, reject) => {
      return put<UpdatableResponse<Page>>(
        this.baseUrl + Endpoints.PAGE + '/' + data.id,
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
        this.baseUrl + Endpoints.PAGE + '/' + id,
        headers
      );
    });
  }
}
