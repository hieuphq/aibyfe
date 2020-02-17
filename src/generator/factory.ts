import {
  Project,
  TestSuite,
  TestCase,
  TestSuiteTestCaseConnect
} from 'types/app';
import faker from 'faker';
import * as Factory from 'factory.ts';

const idGenerator = new Factory.Sync.Generator<string>((seq: number) => {
  return (seq + 1).toString();
});

const sortGenerator = new Factory.Sync.Generator<number>((seq: number) => {
  return seq + 1;
});

const idWithMaxGenerator = (max: number) => {
  return generate<string>(seq =>
    faker.random.number({ min: 1, max: max }).toString()
  );
};

function generate<T>(cond: (seq: number) => T): Factory.Sync.Generator<T> {
  return Factory.each<T>(seq => cond(seq));
}

/*
 * Factory
 */

export const projectsFactory = () => {
  return Factory.Sync.makeFactory<Project>({
    id: idGenerator,
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

export const testSuiteFactory = (maxID: number) => {
  return Factory.Sync.makeFactory<TestSuite>({
    id: idGenerator,
    projectId: idWithMaxGenerator(maxID),
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

export const testCaseFactory = (maxID: number) => {
  return Factory.Sync.makeFactory<TestCase>({
    id: idGenerator,
    sort: sortGenerator,
    name: generate<string>(seq => {
      return faker.lorem.sentence(5, 10);
    }),
    createdAt: generate<Date>(seq => {
      return faker.date.past();
    }),
    updatedAt: generate<Date>(seq => {
      return faker.date.past();
    })
  });
};

export const testSuiteConnFactory = (
  testSuiteCount: number,
  testCaseCount: number
) => {
  return Factory.Sync.makeFactory<TestSuiteTestCaseConnect>({
    id: idGenerator,
    testSuiteId: idWithMaxGenerator(testSuiteCount),
    testCaseId: idWithMaxGenerator(testCaseCount)
  });
};
