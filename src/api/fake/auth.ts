import { IAuthStore } from '../type';
import { AuthResponse } from 'types/app';

export default class FakeAuthStore implements IAuthStore {
  login(email: string, password: string): Promise<AuthResponse> {
    return new Promise<AuthResponse>((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            token: 'fake_token'
          },
          error: null
        });
      }, 1000);
    });
  }
  signup(email: string, password: string): Promise<AuthResponse> {
    return new Promise<AuthResponse>((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            token: 'fake_token'
          },
          error: null
        });
      }, 2000);
    });
  }
}
