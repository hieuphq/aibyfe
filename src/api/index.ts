import { StoreProtocol } from './type';
import {
  AuthResponse,
  UpdatableListResponse,
  UpdatableResponse,
  TestSuite
} from 'types/app';
import { NewFakeStore } from './fake';

export class Repo {
  store: StoreProtocol;

  constructor(store: StoreProtocol) {
    this.store = store;
  }

  login(email: string, password: string): Promise<AuthResponse> {
    return this.store.auth.login(email, password);
  }

  signup(email: string, password: string): Promise<AuthResponse> {
    return this.store.auth.signup(email, password);
  }

  getTestSuites(): Promise<UpdatableListResponse<TestSuite>> {
    return this.store.testSuite.list();
  }

  getTestSuite(id: string): Promise<UpdatableResponse<TestSuite>> {
    return this.store.testSuite.get(id);
  }

  createSuite(dt: Partial<TestSuite>): Promise<UpdatableResponse<TestSuite>> {
    return this.store.testSuite.create(dt);
  }

  updateSuite(dt: Partial<TestSuite>): Promise<UpdatableResponse<TestSuite>> {
    return this.store.testSuite.update(dt);
  }
}

export const repo = new Repo(NewFakeStore());
