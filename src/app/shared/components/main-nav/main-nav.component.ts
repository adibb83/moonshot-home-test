import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { GlobalAppService } from '@services/global-app.service';
import { LogOutService } from '@services/log-out.service';
import { AuthTokenService } from '@services/auth-token.service';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  constructor(
    private breakpointObserver: BreakpointObserver,
    public _globalAppService: GlobalAppService,
    public _logOutService: LogOutService,
    public _authTokenService: AuthTokenService
    ) {}

    logOut() {
      this._logOutService.logOut();
    }

    get showSideNav(): boolean {
      return this._authTokenService.isAuthenticated();
    }
}


