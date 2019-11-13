import { Injectable } from '@angular/core';
import { HttpHeaders} from '@angular//common/http';

@Injectable()
export class AuthTokenService {
    _authToken: any | null;

    constructor() {
        this.authToken = localStorage.getItem('auth-token');
    }

    headers(Authorization: string) {
        const headers = new HttpHeaders({
            Authorization: this.authToken,
            'Content-Type': 'application/json'
        });
        const options = {headers};
        return options;
    }

    set authToken(val: string) {
        // console.log('setting auth token', val);
        if (val) {
            this._authToken = val;
            localStorage.setItem('auth-token', val);
        }
    }

    get authToken() {
        const authFromStorage = localStorage.getItem('auth-token');
        if (!this._authToken || this._authToken !== authFromStorage) {
            this._authToken = authFromStorage;
        }

        return this._authToken;
    }

    removeAuthToken() {
        this.authToken = null;
        localStorage.removeItem('auth-token');
    }

    isAuthenticated() {
        return this.authToken != null;
    }
}
