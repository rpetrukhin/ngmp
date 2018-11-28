import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app-entities/classes/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

}
