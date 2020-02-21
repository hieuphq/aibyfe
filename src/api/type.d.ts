import {
  AuthResponse,
  UpdatableListResponse,
  UpdatableResponse,
  TestSuite,
  TestCase
} from 'types/app';
export interface IAuthStore {
  login(email: string, password: string): Promise<AuthResponse>;

  signup(
    email: string,
    password: string,
    headers: HeadersInit
  ): Promise<AuthResponse>;
}

export interface IUpdatableStore<T> {
  list(
    queryData?: any,
    headers?: HeadersInit
  ): Promise<UpdatableListResponse<T>>;
  get(id: string, headers?: HeadersInit): Promise<UpdatableResponse<T>>;
  create(data: any, headers?: HeadersInit): Promise<UpdatableResponse<T>>;
  update(
    data: Partial<T>,
    headers?: HeadersInit
  ): Promise<UpdatableResponse<T>>;
  delete(
    id: string,
    headers?: HeadersInit
  ): Promise<UpdatableResponse<boolean>>;
}

export interface StoreProtocol {
  auth: IAuthStore;
  testSuite: IUpdatableStore<TestSuite> & {
    removeTestCase(
      id: string,
      testCaseId: string,
      headers?: HeadersInit
    ): Promise<UpdatableResponse<boolean>>;
    addTestCase(
      id: string,
      testCaseId: string,
      headers?: HeadersInit
    ): Promise<UpdatableResponse<boolean>>;
  };
  testCase: IUpdatableStore<TestCase> & {
    listInTestsuite(
      testSuiteId: string,
      headers?: HeadersInit
    ): Promise<UpdatableListResponse<TestCase>>;
  };
  projects: IUpdatableStore<Project> & {};
  pages: IUpdatableStore<Page> & {};
}
