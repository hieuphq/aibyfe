import { IUpdatableStore } from '../type';
import { Project, UpdatableListResponse, UpdatableResponse } from 'types';
import { post, put, get, remove } from 'util/fetch';
import { Endpoints } from 'constant/endpoint';

export default class ProjectsStore implements IUpdatableStore<Project> {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  list(
    userId: string,
    headers?: HeadersInit
  ): Promise<UpdatableListResponse<Project>> {
    return new Promise<UpdatableListResponse<Project>>((resolve, reject) => {
      return get<UpdatableListResponse<Project>>(
        this.baseUrl + Endpoints.USER + '/' + userId + '/projects',
        headers
      );
    });
  }

  get(id: string, headers?: HeadersInit): Promise<UpdatableResponse<Project>> {
    return new Promise<UpdatableResponse<Project>>((resolve, reject) => {
      return get<UpdatableResponse<Project>>(
        this.baseUrl + Endpoints.PROJECT + '/' + id,
        headers
      );
    });
  }

  create(
    data: Partial<Project>,
    headers?: HeadersInit
  ): Promise<UpdatableResponse<Project>> {
    return new Promise<UpdatableResponse<Project>>((resolve, reject) => {
      return post<UpdatableResponse<Project>>(
        this.baseUrl + Endpoints.PROJECT,
        JSON.stringify({ ...data }),
        headers
      );
    });
  }

  update(
    data: Partial<Project>,
    headers?: HeadersInit
  ): Promise<UpdatableResponse<Project>> {
    return new Promise<UpdatableResponse<Project>>((resolve, reject) => {
      return put<UpdatableResponse<Project>>(
        this.baseUrl + Endpoints.PROJECT + '/' + data.id,
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
        this.baseUrl + Endpoints.PROJECT + '/' + id,
        headers
      );
    });
  }
}
