import { IUpdatableStore } from '../type';
import { UpdatableListResponse, UpdatableResponse } from 'types';
import { post, put, get, remove } from 'util/fetch';
import { Endpoints } from 'constant/endpoint';
import { Action, CreateAction, UpdateAction } from 'types/action';

export default class ActionStore implements IUpdatableStore<Action> {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  list(
    pageId: string,
    headers?: HeadersInit
  ): Promise<UpdatableListResponse<Action>> {
    return new Promise<UpdatableListResponse<Action>>((resolve, reject) => {
      get<UpdatableListResponse<Action>>(
        this.baseUrl + Endpoints.PAGE + '/' + pageId + '/actions',
        headers
      ).then(data => {
        resolve(data);
      });
    });
  }

  get(id: string, headers?: HeadersInit): Promise<UpdatableResponse<Action>> {
    return new Promise<UpdatableResponse<Action>>((resolve, reject) => {
      get<UpdatableResponse<Action>>(
        this.baseUrl + Endpoints.ACTION + '/' + id,
        headers
      ).then(data => {
        resolve(data);
      });
    });
  }

  create(
    data: CreateAction,
    headers?: HeadersInit
  ): Promise<UpdatableResponse<Action>> {
    return new Promise<UpdatableResponse<Action>>((resolve, reject) => {
      post<UpdatableResponse<Action>>(
        this.baseUrl + Endpoints.ACTION,
        { ...data },
        headers
      ).then(data => {
        resolve(data);
      });
    });
  }

  update(
    data: UpdateAction,
    headers?: HeadersInit
  ): Promise<UpdatableResponse<Action>> {
    return new Promise<UpdatableResponse<Action>>((resolve, reject) => {
      put<UpdatableResponse<Action>>(
        this.baseUrl + Endpoints.ACTION + '/' + data.id,
        JSON.stringify({ ...data }),
        headers
      ).then(data => {
        resolve(data);
      });
    });
  }

  delete(
    id: string,
    headers?: HeadersInit
  ): Promise<UpdatableResponse<boolean>> {
    return new Promise<UpdatableResponse<boolean>>((resolve, reject) => {
      remove<UpdatableResponse<boolean>>(
        this.baseUrl + Endpoints.ACTION + '/' + id,
        headers
      ).then(data => {
        resolve(data);
      });
    });
  }
}
