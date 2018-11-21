import { Injectable } from '@angular/core';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUser(): User {
    return {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
    };
  }
}
