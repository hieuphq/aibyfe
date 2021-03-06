import { AuthResponse } from 'types';
import { IAuthStore } from '../type';
import { Endpoints } from 'constant/endpoint';
import { post } from 'util/fetch';

export default class Auth implements IAuthStore {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  login(email: string, password: string): Promise<AuthResponse> {
    return new Promise<AuthResponse>((resolve, reject) => {
      return post<AuthResponse>(
        this.baseUrl + Endpoints.LOGIN,
        JSON.stringify({ email, password })
      );
    });
  }
  signup(
    email: string,
    password: string,
    headers?: HeadersInit
  ): Promise<AuthResponse> {
    return new Promise<AuthResponse>((resolve, reject) => {
      return post<AuthResponse>(
        this.baseUrl + Endpoints.SIGNUP,
        JSON.stringify({ email, password }),
        headers
      );
    });
  }
}
