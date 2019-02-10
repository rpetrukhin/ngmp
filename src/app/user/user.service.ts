import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from 'src/app-entities/classes/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public currentUser: User = {
    id: null,
    firstName: null,
    lastName: null,
  };

  public constructor(private http: HttpClient) {}

  public getUser(): void {
    this.http.post('http://localhost:3004/auth/userinfo', {}).subscribe(
      (res: UserInfoResponse) => {
        this.currentUser.firstName = res.name.first;
        this.currentUser.lastName = res.name.last;
        this.currentUser.id = res.id;
      },
      err => {
        console.log(err.error);
      }
    );
  }

  public clearUser(): void {
    this.currentUser = {
      id: null,
      firstName: null,
      lastName: null,
    };
  }
}
