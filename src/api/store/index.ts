import { StoreProtocol } from '../type';
import Auth from './auth';
import TestSuiteStore from './test-suites';
import TestCaseStore from './test-cases';
import ProjectsStore from './projects';

export function NewStore(baseUrl: string): StoreProtocol {
  return {
    auth: new Auth(baseUrl),
    testSuite: new TestSuiteStore(baseUrl),
    testCase: new TestCaseStore(baseUrl),
    projects: new ProjectsStore(baseUrl)
  };
}
