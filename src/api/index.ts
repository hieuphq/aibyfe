import { StoreProtocol } from './type';
import { AuthResponse } from 'types/app';
import { NewFakeStore } from './fake';

export class Repo {
  store: StoreProtocol;

  constructor(store: StoreProtocol) {
    this.store = store;
  }

  login(email: string, password: string): Promise<AuthResponse> {
    return this.store.auth.login(email, password);
  }
}

export const repo = new Repo(NewFakeStore());
