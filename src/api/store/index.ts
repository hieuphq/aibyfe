import { StoreProtocol } from '../type';
import Auth from './auth';
import TestSuiteStore from './test-suites';

export function NewStore(baseUrl: string): StoreProtocol {
  return {
    auth: new Auth(baseUrl),
    testSuite: new TestSuiteStore(baseUrl)
  };
}
