import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoading = false;
  newUserForm: FormGroup;
  tempNewUsername;
  status;
  private authServiceRegisterNewUserSub: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.createNewUserForm();
  }

  ngOnDestroy() {
    if (this.authServiceRegisterNewUserSub)
      this.authServiceRegisterNewUserSub.unsubscribe();
  }

  createNewUserForm() {
    this.newUserForm = new FormGroup({
      'userEmail': new FormControl(null, [Validators.required, Validators.email]),
      'username': new FormControl(null, [Validators.required, Validators.pattern('^(?!_)(?!.*[\W\s].*)(?!.*__.*)[a-zA-z]{3}\w*.*(?<!_)$')])
    })
  }

  onClearNewUserForm() {
    this.createNewUserForm();
  }

  onRegisterNewUser() {
    this.isLoading = true
    this.authServiceRegisterNewUserSub = this.authService.registerNewUser(this.newUserForm.value).subscribe(newUser => {
      this.tempNewUsername = this.newUserForm.get('username').value;
      this.status = 'ok'
      this.createNewUserForm();
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.tempNewUsername = this.newUserForm.get('username').value;
      this.status = 'notOk'
      this.isLoading = false;
    })
  }
}
