import { StoreProtocol } from './type';
import {
  AuthResponse,
  UpdatableListResponse,
  UpdatableResponse,
  TestSuite,
  TestCase,
  TestCaseForTestSuite,
  CreateTestSuite,
  Project,
  Page,
  CreatePage
} from 'types';
import { NewFakeStore } from './fake';
import { CreateAction, Action, UpdateAction } from 'types/action';

export class Repo {
  store: StoreProtocol;

  constructor(store: StoreProtocol) {
    this.store = store;
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  defaultHeaders(): HeadersInit {
    const token = this.getToken();
    const headers = new Headers();
    headers.set('Authorization', 'Bearer ' + token);
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/xml');
    return headers;
  }

  login(email: string, password: string): Promise<AuthResponse> {
    return this.store.auth.login(email, password);
  }

  signup(email: string, password: string): Promise<AuthResponse> {
    return this.store.auth.signup(email, password, this.defaultHeaders());
  }

  getTestSuites(
    projectId?: string | null
  ): Promise<UpdatableListResponse<TestSuite>> {
    return this.store.testSuite.list(projectId, this.defaultHeaders());
  }

  getTestSuite(id: string): Promise<UpdatableResponse<TestSuite>> {
    return this.store.testSuite.get(id, this.defaultHeaders());
  }

  createTestSuite(dt: CreateTestSuite): Promise<UpdatableResponse<TestSuite>> {
    return this.store.testSuite.create(dt, this.defaultHeaders());
  }

  updateSuite(dt: Partial<TestSuite>): Promise<UpdatableResponse<TestSuite>> {
    return this.store.testSuite.update(dt, this.defaultHeaders());
  }

  removeTestcaseFromSuite(
    testSuiteId: string,
    testCaseId: string
  ): Promise<UpdatableResponse<boolean>> {
    return this.store.testSuite.removeTestCase(
      testSuiteId,
      testCaseId,
      this.defaultHeaders()
    );
  }

  getTestCasesInTestSuite(
    testSuiteId?: string | null
  ): Promise<UpdatableListResponse<TestCase>> {
    return this.store.testCase.list(testSuiteId || '', this.defaultHeaders());
  }

  getTestCases(
    projectId?: string | null
  ): Promise<UpdatableListResponse<TestCase>> {
    return this.store.testCase.list(projectId || '', this.defaultHeaders());
  }

  getTestCasesForAddingFlow(
    projectId: string,
    testSuiteId: string
  ): Promise<UpdatableResponse<TestCaseForTestSuite>> {
    return new Promise<UpdatableResponse<TestCaseForTestSuite>>(
      (resolve, reject) => {
        const allTestCase = this.store.testCase.list(
          projectId,
          this.defaultHeaders()
        );
        const testCases = this.store.testCase.listInTestsuite(
          testSuiteId,
          this.defaultHeaders()
        );
        Promise.all([allTestCase, testCases]).then(val => {
          const tcs = val[0].data || [];
          const stcs = val[1].data || [];
          resolve({ data: { testcases: tcs, selectedTestcases: stcs } });
        });
      }
    );
  }

  addTestcaseToSuite(
    testSuiteId: string,
    testCaseId: string | string[]
  ): Promise<UpdatableResponse<boolean>> {
    return this.store.testSuite.addTestCase(
      testSuiteId,
      testCaseId,
      this.defaultHeaders()
    );
  }

  // Projects
  getProjects(): Promise<UpdatableListResponse<Project>> {
    return this.store.projects.list('', this.defaultHeaders());
  }

  getTestCase(testCaseId: string): Promise<UpdatableResponse<TestCase>> {
    return this.store.testCase.get(testCaseId, this.defaultHeaders());
  }

  getPages(projectId: string): Promise<UpdatableListResponse<Page>> {
    return this.store.pages.list(projectId, this.defaultHeaders());
  }

  getPage(id: string): Promise<UpdatableResponse<Page>> {
    return this.store.pages.get(id, this.defaultHeaders());
  }

  createPage(data: CreatePage): Promise<UpdatableResponse<Page>> {
    return this.store.pages.create(data);
  }

  createAction(data: CreateAction): Promise<UpdatableResponse<Action>> {
    return this.store.actions.create(data);
  }

  updateAction(data: UpdateAction): Promise<UpdatableResponse<Action>> {
    return this.store.actions.update(data);
  }
}

export const repo = new Repo(NewFakeStore());
