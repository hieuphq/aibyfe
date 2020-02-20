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

interface AppRawData {
  users: User[];
  projects: Project[];
  testSuites: TestSuite[];
  testCases: TestCase[];
  testSuiteConnection: TestSuiteTestCaseConnect[];
  projectConnection: UserProject[];
}
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

function generateAppData(): AppRawData {
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
    users: [...us],
    projects: [...ps],
    testSuites: [...ts],
    testCases: [...tc],
    testSuiteConnection: [...tstc],
    projectConnection: [...up]
  };
}

const SeedDataKey = 'seed-data';
function generateSeedData(): AppData {
  const dt = localStorage.getItem(SeedDataKey);
  let rawData: AppRawData;
  if (dt === null) {
    rawData = generateAppData();
    localStorage.setItem(SeedDataKey, JSON.stringify(rawData));
  } else {
    rawData = JSON.parse(dt);
  }

  return {
    users: new List<User>(...rawData.users),
    projects: new List<Project>(...rawData.projects),
    testSuites: new List<TestSuite>(...rawData.testSuites),
    testCases: new List<TestCase>(...rawData.testCases),
    testSuiteConnection: new List<TestSuiteTestCaseConnect>(
      ...rawData.testSuiteConnection
    ),
    projectConnection: new List<UserProject>(...rawData.projectConnection)
  };
}

export const appData = generateSeedData();
export type IEntity = Entity;
