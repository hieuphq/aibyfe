import { StoreProtocol } from '../type';
import FakeAuthStore from './auth';
import FakeTestSuiteStore from './test-suites';

export function NewFakeStore(): StoreProtocol {
  return {
    auth: new FakeAuthStore(),
    testSuite: new FakeTestSuiteStore()
  };
}
