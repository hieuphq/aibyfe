import { StoreProtocol } from '../type';
import Auth from './auth';

export function NewStore(baseUrl: string): StoreProtocol {
  return {
    auth: new Auth(baseUrl)
  };
}
