import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';

import { ProgressDialogService } from './progress-dialog.service';
import { AuthTokenService } from './auth-token.service';

@Injectable()
export class LogOutService {
  // private url: string = apiUrl;

  constructor(
    private _authTokenService: AuthTokenService,
    public _progressDialogService: ProgressDialogService
  ) { }

  logOut() {
    this._progressDialogService.loading(true);
    localStorage.clear();
    window.location.replace('/');
  }

}
