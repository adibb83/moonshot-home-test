import { Component, OnInit } from '@angular/core';
import { AccountService , AuthProvider} from '@services/account.service';
import { AccountLoginModel } from '@models/account-login.model';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [AccountService]
})
export class LoginPageComponent implements OnInit {
  userCredentials: AccountLoginModel;
  constructor(private _accountService: AccountService) { }

  ngOnInit() {
  }

  Login() {
   this._accountService.signInWith(AuthProvider.EmailAndPassword , this.userCredentials);
  }

  LoginWithGoogle() {
    this._accountService.signInWith(AuthProvider.Google);
   }

}
