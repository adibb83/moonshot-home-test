import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';

import { ProgressDialogService } from './progress-dialog.service';
import { AuthTokenService } from './auth-token.service';

@Injectable()
export class LogOutService {

  constructor(
    private _authTokenService: AuthTokenService,
    public _progressDialogService: ProgressDialogService
  ) { }

  logOut() {
    this._progressDialogService.loading(true);
    this._authTokenService.removeAuthToken();
    window.location.replace('/authentication');
  }
}
