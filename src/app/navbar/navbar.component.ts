import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoading = false;
  error: string = null;
  activeUser;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.activeUser.subscribe(user => {
      this.activeUser = user;
    })
  }

  onSubmit(form: NgForm) {
    this.error = null;
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const username = form.value.username;
    const password = form.value.password;

    this.authService.logIn(username, password).subscribe(resData => {
        this.isLoading = false;
        this.router.navigate(['/carriers']);
      }, errorMesssage => {
        console.log(errorMesssage);
        this.error = errorMesssage;
        this.isLoading = false;
      }
    );
    form.reset();
  }

  onLogout() {
    this.authService.logout();
  }
}
