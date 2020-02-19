import { IUpdatableStore } from '../type';
import { Project, UpdatableListResponse, UpdatableResponse } from 'types/app';
import { appData } from 'generator';
import { decodeToken } from './token';

export default class FakeProjectStore implements IUpdatableStore<Project> {
  list(
    blank: string,
    headers?: HeadersInit
  ): Promise<UpdatableListResponse<Project>> {
    return new Promise<UpdatableListResponse<Project>>((resolve, reject) => {
      const userId = decodeToken(headers);
      if (userId === '') {
        resolve({
          data: appData.projects.list()
        });
        return;
      }
      const existed = appData.projectConnection
        .list(itm => itm.userId === userId)
        .map(itm => itm.projectId);

      resolve({
        data: appData.projects.list(itm => {
          return existed.indexOf(itm.id) >= 0;
        })
      });
    });
  }
  get(id: string): Promise<UpdatableResponse<Project>> {
    return new Promise<UpdatableResponse<Project>>((resolve, reject) => {
      const itm = appData.projects.list(itm => itm.id === id);
      if (itm.length <= 0) {
        reject(new Error('Not found Test suite'));
        return;
      }
      resolve({ data: this.preload(itm[0]) });
    });
  }
  preload(dt: Project): Project {
    return dt;
  }
  create(data: Partial<Project>): Promise<UpdatableResponse<Project>> {
    return new Promise<UpdatableResponse<Project>>((resolve, reject) => {
      const itm: Project = {
        id: '',
        ownerId: data.ownerId || '',
        name: data.name || '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const newItm = appData.projects.add(itm);
      if (newItm) {
        reject(new Error('unable to create test suite'));
      }
      resolve({ data: newItm });
    });
  }
  update(data: Partial<Project>): Promise<UpdatableResponse<Project>> {
    return new Promise<UpdatableResponse<Project>>((resolve, reject) => {
      const updated = appData.projects.update(data, (old: Project) => {
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
      const existed = appData.projectConnection.list(
        itm => itm.projectId === id
      );
      for (let idx = 0; idx < existed.length; idx++) {
        const itm = existed[idx];
        appData.projectConnection.remove(itm.id);
      }

      // Delete test case data
      if (!appData.projects.remove(id)) {
        reject(new Error('unable to remove Test suite'));
        return;
      }

      resolve({ data: true });
    });
  }
}
