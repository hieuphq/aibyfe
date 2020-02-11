import { StoreProtocol } from '../type';
import FakeAuthStore from './auth';

export function NewFakeStore(): StoreProtocol {
  return {
    auth: new FakeAuthStore()
  };
}
