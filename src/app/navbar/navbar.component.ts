import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {UserModel} from "../model/user.model";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  activeUser: UserModel;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.activeUser.subscribe(user => {
      this.activeUser = user;
    })
  }

  onLogout() {
    this.authService.logout();
  }
}
