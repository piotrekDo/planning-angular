import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading = false;
  userLogged = false;
  error: string = null;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.activeUser.subscribe(user => {
      this.userLogged = !!user;
    })
  }

  onLogin(form: NgForm) {
    this.error = null;
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const username = form.value.username;
    const password = form.value.password;

    this.authService.logIn(username, password).subscribe(resData => {
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
