import { Injectable } from '@angular/core';

import { UserAuthInfo } from 'src/app-entities/classes/user-auth-info.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  _isAuthenticated = false;
  _userInfo: string;

  login(info: UserAuthInfo): void {
    localStorage.setItem('userInfo', JSON.stringify(info));
    this._isAuthenticated = true;
    this._userInfo = info.email;
  }

  logout(): void {
    localStorage.removeItem('userInfo');
    this._isAuthenticated = false;
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  get userInfo(): string {
    return this._userInfo;
  }
}
