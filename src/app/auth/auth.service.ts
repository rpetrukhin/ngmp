import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserAuthInfo } from 'src/app-entities/classes/user-auth-info.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = false;

  public constructor(private http: HttpClient) {}

  public login(info: UserAuthInfo): Observable<Object> {
    return this.http.post(
      'http://localhost:3004/auth/login',
      JSON.stringify(info)
    );
  }

  public logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
  }
}
