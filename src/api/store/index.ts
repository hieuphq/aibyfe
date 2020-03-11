import { StoreProtocol } from '../type';
import Auth from './auth';
import TestSuiteStore from './test-suites';
import TestCaseStore from './test-cases';
import ProjectsStore from './projects';
import PagesStore from './pages';
import ActionStore from './actions';

export function NewStore(baseUrl: string): StoreProtocol {
  return {
    auth: new Auth(baseUrl),
    testSuite: new TestSuiteStore(baseUrl),
    testCase: new TestCaseStore(baseUrl),
    projects: new ProjectsStore(baseUrl),
    pages: new PagesStore(baseUrl),
    actions: new ActionStore(baseUrl)
  };
}
