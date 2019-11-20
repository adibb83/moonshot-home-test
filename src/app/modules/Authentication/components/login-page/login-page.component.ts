import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService, AuthProvider } from '@services/account.service';
import { AccountLoginModel } from '@models/account-login.model';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [AccountService]
})
export class LoginPageComponent implements OnInit, OnDestroy {
  userCredentials: AccountLoginModel;
  public error: any;
  public loginForm: FormGroup;
  subscriptions: Subscription;
  constructor(
    private _accountService: AccountService,
    private formBuilder: FormBuilder) {

    this.subscriptions = this._accountService.loginError$.subscribe(err => this.error = err);
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.createForm();
  }

  login() {
    this.error = null;
    this.userCredentials = new AccountLoginModel(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
    this._accountService.signInWith(AuthProvider.EmailAndPassword, this.userCredentials);
  }

  loginWithGoogle() {
    this._accountService.signInWith(AuthProvider.Google);
  }

  getEmailError(): string {
    if (this.loginForm.controls.email.errors) {
      if (this.loginForm.controls.email.errors.required) {
        return 'Email is required';
      } else if (this.loginForm.controls.email.errors.email) {
        return 'Email is not valid';
      }
    }
  }

  getPasswordError(): string {
    if (this.loginForm.controls.password.errors) {
      if (this.loginForm.controls.password.errors.required) {
        return 'Password is required';
      } else if (this.loginForm.controls.password.errors.minlength) {
        return 'password must be at least 6 characters long.';
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
