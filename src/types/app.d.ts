export interface AuthState {
  isLogin: boolean;
  token?: string | null;
}

export interface AppRootState {
  auth: Partial<AuthState>;
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
