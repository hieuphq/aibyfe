import { StoreProtocol } from '../type';
import FakeAuthStore from './auth';
import FakeTestSuiteStore from './test-suites';
import FakeTestCaseStore from './test-cases';
import FakeProjectStore from './projects';
import FakePageStore from './page';
import FakeActionStore from './action';

export function NewFakeStore(): StoreProtocol {
  return {
    auth: new FakeAuthStore(),
    testSuite: new FakeTestSuiteStore(),
    testCase: new FakeTestCaseStore(),
    projects: new FakeProjectStore(),
    pages: new FakePageStore(),
    actions: new FakeActionStore()
  };
}
