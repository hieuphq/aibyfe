import {
  AuthResponse,
  UpdatableListResponse,
  UpdatableResponse,
  TestSuite
} from 'types/app';
export interface IAuthStore {
  login(email: string, password: string): Promise<AuthResponse>;
  signup(email: string, password: string): Promise<AuthResponse>;
}

export interface IUpdatableStore<T> {
  list(queryData?: any): Promise<UpdatableListResponse<T>>;
  get(id: string): Promise<UpdatableResponse<T>>;
  create(data: Partial<T>): Promise<UpdatableResponse<T>>;
  update(data: Partial<T>): Promise<UpdatableResponse<T>>;
  delete(id: string): Promise<UpdatableResponse<boolean>>;
}

export interface StoreProtocol {
  auth: IAuthStore;
  testSuite: IUpdatableStore<TestSuite>;
}
