import {
  Project,
  TestSuite,
  TestCase,
  TestSuiteTestCaseConnect,
  UserProject,
  User
} from 'types/app';
import { IEntity as Entity, List } from './list';
import * as Factory from './factory';

export interface AppData {
  users: List<User>;
  projects: List<Project>;
  testSuites: List<TestSuite>;
  testCases: List<TestCase>;
  testSuiteConnection: List<TestSuiteTestCaseConnect>;
  projectConnection: List<UserProject>;
}

const numOfUser = 1;
const numOfProject = 3;
const defaultUser = {
  email: 'admin@aiby.com',
  username: 'admin',
  id: numOfUser.toString()
};

export function generateAppData(): AppData {
  let us = Factory.usersFactory().buildList(numOfUser);
  us.push(defaultUser);
  let ps = Factory.projectsFactory(us.length).buildList(numOfProject);
  let up = Factory.userProjectConnFactory(ps.length, us.length).buildList(
    ps.length
  );
  let ts: TestSuite[] = [];
  let tc: TestCase[] = [];
  let tstc: TestSuiteTestCaseConnect[] = [];

  let nextTsIdx = 0;
  let nextTcIdx = 0;
  let nextTsTcIdx = 0;

  for (let idx = 0; idx < ps.length; idx++) {
    const proj = ps[idx];
    let ss = Factory.testSuiteFactory(nextTsIdx, proj.id).buildList(
      Factory.randomNumber(1, numOfProject)
    );

    let cs = Factory.testCaseFactory(nextTcIdx, proj.id).buildList(
      Factory.randomNumber(1, numOfProject * 3)
    );

    let tsConn = Factory.testSuiteConnFactory(
      nextTsTcIdx,
      nextTsIdx,
      ss.length,
      nextTcIdx,
      cs.length
    ).buildList((ss.length + cs.length) * 3);
    nextTsTcIdx = nextTsTcIdx + tsConn.length;

    nextTsIdx = nextTsIdx + ss.length;
    nextTcIdx = nextTcIdx + cs.length;

    ts = [...ts, ...ss];
    tc = [...tc, ...cs];
    tstc = [...tstc, ...tsConn];
  }
  return {
    users: new List<User>(...us),
    projects: new List<Project>(...ps),
    testSuites: new List<TestSuite>(...ts),
    testCases: new List<TestCase>(...tc),
    testSuiteConnection: new List<TestSuiteTestCaseConnect>(...tstc),
    projectConnection: new List<UserProject>(...up)
  };
}

export const appData = generateAppData();
export type IEntity = Entity;
