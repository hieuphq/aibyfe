import { IUpdatableStore } from '../type';
import { Page, UpdatableListResponse, UpdatableResponse } from '@types';
import { DataFactory } from 'generator';

export default class FakePageStore implements IUpdatableStore<Page> {
  list(
    projectId: string,
    headers?: HeadersInit
  ): Promise<UpdatableListResponse<Page>> {
    return new Promise<UpdatableListResponse<Page>>((resolve, reject) => {
      const appData = DataFactory.getInstance().appData();
      if (projectId === '') {
        resolve({
          data: appData.pages.list()
        });
        return;
      }
      console.log(appData);

      resolve({
        data: appData.pages.list(itm => itm.projectId === projectId)
      });
    });
  }
  get(id: string): Promise<UpdatableResponse<Page>> {
    return new Promise<UpdatableResponse<Page>>((resolve, reject) => {
      const appData = DataFactory.getInstance().appData();
      const itm = appData.pages.list(itm => itm.id === id);
      if (itm.length <= 0) {
        reject(new Error('Not found Test suite'));
        return;
      }
      resolve({ data: this.preload(itm[0]) });
    });
  }
  preload(dt: Page): Page {
    return dt;
  }
  create(data: Partial<Page>): Promise<UpdatableResponse<Page>> {
    return new Promise<UpdatableResponse<Page>>((resolve, reject) => {
      const appData = DataFactory.getInstance().appData();
      const itm: Page = {
        id: '',
        projectId: data.projectId || '',
        sort: data.sort || 0,
        name: data.name || '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const newItm = appData.pages.add(itm);
      if (!newItm) {
        reject(new Error('unable to create test suite'));
      }
      DataFactory.getInstance().setAppData(appData);
      resolve({ data: newItm });
    });
  }
  update(data: Partial<Page>): Promise<UpdatableResponse<Page>> {
    return new Promise<UpdatableResponse<Page>>((resolve, reject) => {
      const appData = DataFactory.getInstance().appData();
      const updated = appData.pages.update(data, (old: Page) => {
        return old.id === data.id;
      });

      if (!updated) {
        reject(new Error('Not found'));
        return;
      }
      DataFactory.getInstance().setAppData(appData);
      resolve({ data: updated });
    });
  }
  delete(id: string): Promise<UpdatableResponse<boolean>> {
    return new Promise<UpdatableResponse<boolean>>((resolve, reject) => {
      // Delete in connection data
      const appData = DataFactory.getInstance().appData();
      const existed = appData.pageConnection.list(itm => itm.pageId === id);
      for (let idx = 0; idx < existed.length; idx++) {
        const itm = existed[idx];
        appData.pageConnection.remove(itm.id);
      }

      // Delete test case data
      if (!appData.pages.remove(id)) {
        reject(new Error('unable to remove Test suite'));
        return;
      }
      DataFactory.getInstance().setAppData(appData);
      resolve({ data: true });
    });
  }
}
