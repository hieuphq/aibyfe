import {
  Project,
  TestSuite,
  TestCase,
  TestSuiteTestCaseConnect
} from 'types/app';
import { IEntity as Entity, List } from './list';
import * as Factory from './factory';

export interface AppData {
  projects: List<Project>;
  testSuites: List<TestSuite>;
  testCases: List<TestCase>;
  testSuiteConnection: List<TestSuiteTestCaseConnect>;
}

export function generateAppData(): AppData {
  let numOfProject = 10;
  let ps = Factory.projectsFactory().buildList(numOfProject);
  let ts = Factory.testSuiteFactory(ps.length).buildList(numOfProject * 3 + 10);
  let tc = Factory.testCaseFactory(ts.length).buildList(numOfProject * 6 + 20);
  let tsConn = Factory.testSuiteConnFactory(ts.length, tc.length).buildList(
    (ts.length + tc.length) * 3
  );
  return {
    projects: new List<TestSuite>(...ps),
    testSuites: new List<TestSuite>(...ts),
    testCases: new List<TestCase>(...tc),
    testSuiteConnection: new List<TestSuiteTestCaseConnect>(...tsConn)
  };
}

export const appData = generateAppData();
export type IEntity = Entity;
