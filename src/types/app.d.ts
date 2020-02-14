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

export interface TestSuite {
  id: string;
  name: string;
  createdAt: date;
  updatedAt: date;
  testCases?: TestCase[];
}

export interface TestCase {
  id: string;
  testSuiteId: string;
  name: string;
  sort: number;
  createdAt: date;
  updatedAt: date;
}

export interface UpdatableListResponse<T> {
  data?: T[];
  error?: string | null;
}

export interface UpdatableResponse<T> {
  data?: T;
  error?: string | null;
}
