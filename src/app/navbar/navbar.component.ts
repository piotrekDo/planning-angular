import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {UserModel} from "../model/user.model";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  activeUser: UserModel;
  private authServiceActiveUserSub: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authServiceActiveUserSub = this.authService.activeUser.subscribe(user => {
      this.activeUser = user;
    })
  }

  ngOnDestroy() {
    this.authServiceActiveUserSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
