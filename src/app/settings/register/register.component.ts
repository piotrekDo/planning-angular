import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  newUserForm: FormGroup;
  tempNewUsername;
  status;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.createNewUserForm();
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
    this.authService.registerNewUser(this.newUserForm.value).subscribe(newUser => {
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
