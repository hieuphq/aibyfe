import { AuthResponse } from 'types/app';
export interface IAuthStore {
  login(email: string, password: string): Promise<AuthResponse>;
}

export interface StoreProtocol {
  auth: IAuthStore;
}
