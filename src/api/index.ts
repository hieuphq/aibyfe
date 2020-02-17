import { StoreProtocol } from './type';
import {
  AuthResponse,
  UpdatableListResponse,
  UpdatableResponse,
  TestSuite,
  TestCase,
  TestCaseForTestSuite
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

  getTestSuites(
    projectId?: string | null
  ): Promise<UpdatableListResponse<TestSuite>> {
    return this.store.testSuite.list(projectId);
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

  removeTestcaseInSuite(
    testSuiteId: string,
    testCaseId: string
  ): Promise<UpdatableResponse<boolean>> {
    return this.store.testSuite.removeTestCase(testSuiteId, testCaseId);
  }

  getTestCasesForAddingFlow(
    testSuiteId?: string | null
  ): Promise<UpdatableResponse<TestCaseForTestSuite>> {
    return new Promise<UpdatableResponse<TestCaseForTestSuite>>(
      (resolve, reject) => {
        const allTestCase = this.store.testCase.list('');
        const testCases = this.store.testCase.list(testSuiteId);
        Promise.all([allTestCase, testCases]).then(val => {
          const tcs = val[0].data || [];
          const stcs = val[1].data || [];
          resolve({ data: { testcases: tcs, selectedTestcases: stcs } });
        });
      }
    );
  }
}

export const repo = new Repo(NewFakeStore());
