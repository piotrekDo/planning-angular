import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  userLogged = false;
  error: string = null;
  private authServiceActiveUserSub: Subscription;
  private authServiceLogInSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authServiceActiveUserSub = this.authService.activeUser.subscribe(
      (user) => {
        this.userLogged = !!user;
      }
    );
  }

  ngOnDestroy() {
    this.authServiceActiveUserSub.unsubscribe();
    if (this.authServiceLogInSub) this.authServiceLogInSub.unsubscribe();
  }

  onLogin(form: NgForm) {
    this.error = null;
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const username = form.value.username;
    const password = form.value.password;

    this.authServiceLogInSub = this.authService.logIn(username, password).subscribe(resData => {
        this.isLoading = false;
        form.reset();
        this.router.navigate(['/main']);
      }, errorMesssage => {
        console.log(errorMesssage);
        this.error = errorMesssage;
        this.isLoading = false;
        form.reset();
      }
    );
  }

}
