import { IAuthStore } from '../type';
import { AuthResponse } from 'types';
import { DataFactory } from 'generator';
import { generateToken } from './token';

export default class FakeAuthStore implements IAuthStore {
  login(email: string, password: string): Promise<AuthResponse> {
    return new Promise<AuthResponse>((resolve, reject) => {
      setTimeout(() => {
        const us = DataFactory.getInstance()
          .appData()
          .users.list(itm => itm.email === email || itm.username === email);
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
        const data = DataFactory.getInstance().appData();

        const u = data.users.add({
          id: '',
          username: email,
          email: email
        });
        DataFactory.getInstance().setAppData(data);
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
