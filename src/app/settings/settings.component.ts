import {Component, OnInit} from '@angular/core';
import {UserModel} from "../model/user.model";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  activeUser: UserModel;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.activeUser.subscribe(user => this.activeUser = user);
  }

}
