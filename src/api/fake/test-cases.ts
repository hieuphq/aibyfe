import { IUpdatableStore } from '../type';
import { TestCase, UpdatableListResponse, UpdatableResponse } from 'types/app';

let testCases: TestCase[] = [
  {
    id: '1',
    testSuiteId: '1',
    sort: 1,
    name: 'Login',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    testSuiteId: '1',
    sort: 2,
    name: 'Register new account',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    testSuiteId: '1',
    sort: 3,
    name: 'Make a project',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    testSuiteId: '1',
    sort: 4,
    name: 'Delete a project',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    testSuiteId: '1',
    sort: 5,
    name: 'Add a file into project',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
let nextId = 5;
