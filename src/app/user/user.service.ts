import { Injectable } from '@angular/core';

import { User } from 'src/app-entities/classes/user.model';

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
