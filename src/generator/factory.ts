import {
  Project,
  TestSuite,
  TestCase,
  TestSuiteTestCaseConnect,
  User,
  UserProject,
  Page
} from 'types';
import faker from 'faker';
import * as Factory from 'factory.ts';

const idGenerator = (startIndex?: number) =>
  new Factory.Sync.Generator<string>((seq: number) => {
    return ((startIndex || 0) + seq + 1).toString();
  });

const sortGenerator = new Factory.Sync.Generator<number>((seq: number) => {
  return seq + 1;
});

const idWithMaxGenerator = (min: number, max: number) => {
  return generate<string>(seq =>
    faker.random.number({ min: min, max: max }).toString()
  );
};

function generate<T>(cond: (seq: number) => T): Factory.Sync.Generator<T> {
  return Factory.each<T>(seq => cond(seq));
}

export function randomNumber(min: number, max: number): number {
  return faker.random.number({ min, max });
}

/*
 * Factory
 */

export const usersFactory = () => {
  return Factory.Sync.makeFactory<User>({
    id: idGenerator(),
    username: generate<string>(seq => {
      return faker.internet.userName();
    }),
    email: generate<string>(seq => {
      return faker.internet.email();
    })
  });
};

export const projectsFactory = (maxOfUser: number) => {
  return Factory.Sync.makeFactory<Project>({
    id: idGenerator(),
    ownerId: idWithMaxGenerator(1, maxOfUser),
    name: generate<string>(seq => {
      return faker.lorem.sentence(3, 10);
    }),
    createdAt: generate<Date>(seq => {
      return faker.date.past();
    }),
    updatedAt: generate<Date>(seq => {
      return faker.date.past();
    })
  });
};

export const userProjectConnFactory = (
  projectCount: number,
  userCount: number
) => {
  return Factory.Sync.makeFactory<UserProject>({
    id: idGenerator(),
    projectId: idWithMaxGenerator(1, projectCount),
    userId: idWithMaxGenerator(1, userCount)
  });
};

export const testSuiteFactory = (startIdx: number, projectId: string) => {
  return Factory.Sync.makeFactory<TestSuite>({
    id: idGenerator(startIdx),
    projectId: projectId,
    name: generate<string>(seq => {
      return faker.lorem.sentence(3, 5);
    }),
    createdAt: generate<Date>(seq => {
      return faker.date.past();
    }),
    updatedAt: generate<Date>(seq => {
      return faker.date.past();
    })
  });
};

export const testCaseFactory = (startIdx: number, projectId: string) => {
  return Factory.Sync.makeFactory<TestCase>({
    id: idGenerator(startIdx),
    sort: sortGenerator,
    name: generate<string>(seq => {
      return 'TC-' + faker.lorem.sentence(5, 10);
    }),
    projectId,
    createdAt: generate<Date>(seq => {
      return faker.date.past();
    }),
    updatedAt: generate<Date>(seq => {
      return faker.date.past();
    })
  });
};

export const testSuiteConnFactory = (
  startIdx: number,
  testSuiteStart: number,
  testSuiteCount: number,
  testCaseStart: number,
  testCaseCount: number
) => {
  return Factory.Sync.makeFactory<TestSuiteTestCaseConnect>({
    id: idGenerator(startIdx),
    testSuiteId: idWithMaxGenerator(
      testSuiteStart + 1,
      testSuiteStart + testSuiteCount
    ),
    testCaseId: idWithMaxGenerator(
      testCaseStart + 1,
      testCaseStart + testCaseCount
    )
  });
};

export const pageUIFactory = (startIdx: number, projectId: string) => {
  return Factory.Sync.makeFactory<Page>({
    id: idGenerator(startIdx),
    name: generate<string>(seq => {
      return faker.lorem.words(faker.random.number({ min: 3, max: 6 }));
    }),
    projectId: projectId.toString(),
    sort: sortGenerator,
    createdAt: generate<Date>(seq => {
      return faker.date.past();
    }),
    updatedAt: generate<Date>(seq => {
      return faker.date.past();
    })
  });
};
