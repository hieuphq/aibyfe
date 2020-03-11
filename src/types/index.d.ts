export interface AuthState {
  isLogin: boolean;
  token?: string | null;
}

export interface AppRootState {
  auth: Partial<AuthState>;
  projectId?: string | null;
}

export class AuthData {
  token: string;
}
export interface AuthResponse {
  data: AuthData;
  error: string | null;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
}

export interface SignUpResponse {
  data: AuthData;
  error: string | null;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface UserProject {
  id: string;
  userId: string;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface TestSuite {
  id: string;
  name: string;
  projectId?: string;
  createdAt: Date;
  updatedAt: Date;
  testCases?: TestCase[];
}

export interface CreateTestSuite {
  projectId: string;
  name: string;
  testCases?: string[];
}

export interface TestCase {
  id: string;
  name: string;
  sort: number;
  projectId: string;
  steps?: Step[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TestCaseForTestSuite {
  testcases: TestCase[];
  selectedTestcases: TestCase[];
}

export interface Page {
  id: string;
  name: string;
  projectId: string;
  sort: number;
  actions?: Action[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePage {
  name: string;
  projectId: string;
}

export interface TestcasePage {
  id: string;
  testCaseId: string;
  pageId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdatableListResponse<T> {
  data?: T[];
  error?: string | null;
}

export interface UpdatableResponse<T> {
  data?: T | null;
  error?: string | null;
}

export interface TestSuiteTestCaseConnect {
  id: string;
  testCaseId: string;
  testSuiteId: string;
}
