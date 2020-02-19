import { IAuthStore } from '../type';
import { AuthResponse } from 'types/app';
import { appData } from 'generator';
import { generateToken } from './token';

export default class FakeAuthStore implements IAuthStore {
  login(email: string, password: string): Promise<AuthResponse> {
    return new Promise<AuthResponse>((resolve, reject) => {
      setTimeout(() => {
        const us = appData.users.list(
          itm => itm.email === email || itm.username === email
        );
        if (us.length > 0) {
          resolve({
            data: {
              token: generateToken(us[0].id)
            },
            error: null
          });
          return;
        }
        reject(new Error('username or password is invalid'));
      }, 1000);
    });
  }
  signup(email: string, password: string): Promise<AuthResponse> {
    return new Promise<AuthResponse>((resolve, reject) => {
      setTimeout(() => {
        const u = appData.users.add({ id: '', username: email, email: email });
        resolve({
          data: {
            token: generateToken(u?.id || '')
          },
          error: null
        });
      }, 2000);
    });
  }
}
