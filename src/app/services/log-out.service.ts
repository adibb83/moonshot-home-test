import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';

import { ProgressDialogService } from './progress-dialog.service';
import { AuthTokenService } from './auth-token.service';

@Injectable()
export class LogOutService {
  // private url: string = apiUrl;

  constructor(
    private _authTokenService: AuthTokenService,
    // private _agentsService: AgentsService,
    // private _router: Router,
    public _progressDialogService: ProgressDialogService
  ) { }

  logOut() {
    this._progressDialogService.loading(true);
    localStorage.clear();

    // reload to clean any assigned variables of log out user
    // this._router.navigate(['/account', 'login']);
    window.location.replace('/');
  }

}
