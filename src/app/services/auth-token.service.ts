import { Injectable } from '@angular/core';

@Injectable()
export class AuthTokenService {
    _authToken: any | null;

    constructor() {
        this.authToken = localStorage.getItem('username');
    }

    set authToken(val: string) {
        // console.log('setting auth token', val);
        if (val) {
            this._authToken = val;
            localStorage.setItem('username', val);
        }
    }

    get authToken() {
        const authFromStorage = localStorage.getItem('username');
        if (!this._authToken || this._authToken !== authFromStorage) {
            this._authToken = authFromStorage;
        }

        return this._authToken;
    }

    removeAuthToken() {
        this.authToken = null;
        localStorage.removeItem('username');
    }

    isAuthenticated() {
        return this.authToken != null;
    }
}
