import { Injectable } from '@angular/core';

@Injectable()
export class AuthTokenService {
    _authToken: any | null;

    constructor() {
        this.authToken = localStorage.getItem('userId');
    }

    set authToken(val: string) {
        // console.log('setting auth token', val);
        if (val) {
            this._authToken = val;
            localStorage.setItem('userId', val);
        }
    }

    get authToken() {
        const authFromStorage = localStorage.getItem('userId');
        if (!this._authToken || this._authToken !== authFromStorage) {
            this._authToken = authFromStorage;
        }

        return this._authToken;
    }

    removeAuthToken() {
        this.authToken = null;
        localStorage.removeItem('userId');
    }

    isAuthenticated() {
        return this.authToken != null;
    }
}
