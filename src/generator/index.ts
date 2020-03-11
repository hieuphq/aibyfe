import {
  Project,
  TestSuite,
  TestCase,
  TestSuiteTestCaseConnect,
  UserProject,
  User,
  Page,
  TestcasePage
} from 'types';
import { IEntity as Entity, List } from './list';
import * as Factory from './factory';
import { Action, ActionsSteps, PagesActions } from 'types/action';
import { Step } from 'types/step';

interface ListData<T> {
  data: T[];
  nextIndex: number;
}

interface AppRawData {
  users: ListData<User>;
  projects: ListData<Project>;
  testSuites: ListData<TestSuite>;
  testCases: ListData<TestCase>;
  testSuiteConnection: ListData<TestSuiteTestCaseConnect>;
  projectConnection: ListData<UserProject>;
  pages: ListData<Page>;
  pageConnection: ListData<TestcasePage>;
  pageActions: ListData<PagesActions>;
  actions: ListData<Action>;
  actionSteps: ListData<ActionsSteps>;
  steps: ListData<Step>;
}
export interface AppData {
  users: List<User>;
  projects: List<Project>;
  testSuites: List<TestSuite>;
  testCases: List<TestCase>;
  testSuiteConnection: List<TestSuiteTestCaseConnect>;
  projectConnection: List<UserProject>;
  pages: List<Page>;
  pageConnection: List<TestcasePage>;
  pageActions: List<PagesActions>;
  actions: List<Action>;
  actionSteps: List<ActionsSteps>;
  steps: List<Step>;
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
  let projs = Factory.projectsFactory(us.length).buildList(numOfProject);
  let up = Factory.userProjectConnFactory(projs.length, us.length).buildList(
    projs.length
  );
  let ts: TestSuite[] = [];
  let tc: TestCase[] = [];
  let tstc: TestSuiteTestCaseConnect[] = [];
  let pages: Page[] = [];

  let nextTsIdx = 0;
  let nextTcIdx = 0;
  let nextTsTcIdx = 0;
  let nextPageIdx = 0;

  for (let idx = 0; idx < projs.length; idx++) {
    const proj = projs[idx];
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

    let pUIs = Factory.pageUIFactory(nextPageIdx, proj.id).buildList(
      Factory.randomNumber(1, numOfProject)
    );

    // Update next ids
    nextTsTcIdx = nextTsTcIdx + tsConn.length;
    nextTsIdx = nextTsIdx + ss.length;
    nextTcIdx = nextTcIdx + cs.length;
    nextPageIdx = nextPageIdx + pUIs.length;

    ts = [...ts, ...ss];
    tc = [...tc, ...cs];
    tstc = [...tstc, ...tsConn];
    pages = [...pages, ...pUIs];
  }

  return {
    users: { data: [...us], nextIndex: us.length },
    projects: { data: [...projs], nextIndex: projs.length },
    testSuites: { data: [...ts], nextIndex: ts.length },
    testCases: { data: [...tc], nextIndex: tc.length },
    testSuiteConnection: { data: [...tstc], nextIndex: tstc.length },
    projectConnection: { data: [...up], nextIndex: up.length },
    pages: { data: [...pages], nextIndex: pages.length },
    pageConnection: { data: [], nextIndex: 0 },
    pageActions: { data: [], nextIndex: 0 },
    actions: { data: [], nextIndex: 0 },
    actionSteps: { data: [], nextIndex: 0 },
    steps: { data: [], nextIndex: 0 }
  };
}

function updateLocalStorage(appData: AppData) {
  // No need update when have no data in storage
  const data = localStorage.getItem(SeedDataKey);
  if (!data) {
    return;
  }

  const rawData: AppRawData = {
    users: {
      data: [...appData.users.list()],
      nextIndex: appData.users.getNextID()
    },
    projects: {
      data: [...appData.projects.list()],
      nextIndex: appData.projects.getNextID()
    },
    testSuites: {
      data: [...appData.testSuites.list()],
      nextIndex: appData.testSuites.getNextID()
    },
    testCases: {
      data: [...appData.testCases.list()],
      nextIndex: appData.testCases.getNextID()
    },
    testSuiteConnection: {
      data: [...appData.testSuiteConnection.list()],
      nextIndex: appData.testSuiteConnection.getNextID()
    },
    projectConnection: {
      data: [...appData.projectConnection.list()],
      nextIndex: appData.projectConnection.getNextID()
    },
    pages: {
      data: [...appData.pages.list()],
      nextIndex: appData.pages.getNextID()
    },
    pageConnection: {
      data: [...appData.pageConnection.list()],
      nextIndex: appData.pageConnection.getNextID()
    },
    pageActions: {
      data: [...appData.pageActions.list()],
      nextIndex: appData.pageActions.getNextID()
    },
    actions: {
      data: [...appData.actions.list()],
      nextIndex: appData.actions.getNextID()
    },
    actionSteps: {
      data: [...appData.actionSteps.list()],
      nextIndex: appData.actionSteps.getNextID()
    },
    steps: {
      data: [...appData.steps.list()],
      nextIndex: appData.steps.getNextID()
    }
  };
  localStorage.setItem(SeedDataKey, JSON.stringify(rawData));
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
    users: new List<User>(rawData.users.nextIndex, ...rawData.users.data),
    projects: new List<Project>(
      rawData.projects.nextIndex,
      ...rawData.projects.data
    ),
    testSuites: new List<TestSuite>(
      rawData.testSuites.nextIndex,
      ...rawData.testSuites.data
    ),
    testCases: new List<TestCase>(
      rawData.testCases.nextIndex,
      ...rawData.testCases.data
    ),
    testSuiteConnection: new List<TestSuiteTestCaseConnect>(
      rawData.testSuiteConnection.nextIndex,
      ...rawData.testSuiteConnection.data
    ),
    projectConnection: new List<UserProject>(
      rawData.projectConnection.nextIndex,
      ...rawData.projectConnection.data
    ),
    pages: new List<Page>(rawData.pages.nextIndex, ...rawData.pages.data),
    pageConnection: new List<TestcasePage>(
      rawData.pageConnection.nextIndex,
      ...rawData.pageConnection.data
    ),
    actions: new List<Action>(
      rawData.actions.nextIndex,
      ...rawData.actions.data
    ),
    actionSteps: new List<ActionsSteps>(
      rawData.actionSteps.nextIndex,
      ...rawData.actionSteps.data
    ),
    steps: new List<Step>(rawData.actionSteps.nextIndex, ...rawData.steps.data),
    pageActions: new List<PagesActions>(
      rawData.pageActions.nextIndex,
      ...rawData.pageActions.data
    )
  };
}

// export let appData = generateSeedData();

export type IEntity = Entity;

export class DataFactory {
  private static instance: DataFactory;
  private data: AppData;

  private constructor() {
    this.data = generateSeedData();
  }

  public static getInstance(): DataFactory {
    if (!DataFactory.instance) {
      DataFactory.instance = new DataFactory();
    }

    return DataFactory.instance;
  }
  public appData(): AppData {
    return this.data;
  }

  public setAppData(dt: AppData) {
    this.data = dt;
    updateLocalStorage(dt);
  }
}
