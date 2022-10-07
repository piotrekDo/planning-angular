import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from "../model/user.model";
import {AuthService} from "../auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  activeUser: UserModel;
  private authServiceActiveUserSub: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authServiceActiveUserSub = this.authService.activeUser.subscribe(user => this.activeUser = user);
  }

  ngOnDestroy() {
    this.authServiceActiveUserSub.unsubscribe();
  }

}
