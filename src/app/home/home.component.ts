import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading = false;
  userLogged = false;
  error: string = null;
  private authServiceActiveUserSub: Subscription;
  private authServiceLogInSub: Subscription;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authServiceActiveUserSub = this.authService.activeUser.subscribe(user => {
      this.userLogged = !!user;
    })
  }

  ngOnDestroy() {
    this.authServiceActiveUserSub.unsubscribe();
    if (this.authServiceLogInSub)
      this.authServiceLogInSub.unsubscribe();
  }

}
