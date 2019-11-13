import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthTokenService } from './auth-token.service';
import { Observable } from 'rxjs' ;

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        readonly _authTokenService: AuthTokenService,
        readonly _router: Router
    ) { }

    canActivate(): Observable<boolean> | boolean {
        if (this._authTokenService.authToken) {
            return true;
        }

        this._router.navigate(['/account', 'login']);

        return false;
    }
}

export class AuthGuardReversed extends AuthGuard implements CanActivate {

    canActivate(): Observable<boolean> | boolean {
        if (this._authTokenService.authToken) {
            this._router.navigate(['/']);
            return false;
        }

        return true;
    }

}

