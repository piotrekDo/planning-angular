import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  isLoading: boolean = false;
  requestTokenForm: FormGroup;
  resetPasswordForm: FormGroup;
  requestState: boolean = true;
  passwordChanged = false;
  error: string = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.createPasswordResetRequestForm();
    this.createResetPasswordForm();
  }

  createPasswordResetRequestForm() {
    this.requestTokenForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'username': new FormControl(null, Validators.required),
    })
  }

  createResetPasswordForm() {
    this.resetPasswordForm = new FormGroup({
      'newPassword': new FormControl(null, Validators.required),
      'username': new FormControl(null, Validators.required),
      'changePasswordToken': new FormControl(null, Validators.required)
    })
  }

  onTokenSendRequest() {
    this.isLoading = true;
    this.authService.sendResetPasswordTokenRequest(this.requestTokenForm.value).subscribe(resetToken => {
      this.isLoading = false;
      this.requestState = false;
      this.error = undefined;
      this.passwordChanged = false;
      this.createPasswordResetRequestForm();
    }, error => {
      console.log(error);
      this.error = error;
      this.isLoading = false;
    })
  }

  onChangePasswordRequest() {
    this.isLoading = true;
    this.authService.sendResetPasswordRequest(this.resetPasswordForm.value).subscribe(username => {
      this.isLoading = false;
      this.passwordChanged = true;
      this.error = undefined;
      this.createResetPasswordForm();
    }, error1 => {
      console.log(error1);
      this.error = error1;
      this.isLoading = false;
    })
  }
}
