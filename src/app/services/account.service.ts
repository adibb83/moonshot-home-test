import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { HttpExtendedService } from './http-extended.service';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiUrl } from '../globals';

import { AccountRegisterModel } from '../models/account-register.model';
import { AccountLoginModel } from '../models/account-login.model';

import { HeadersService } from './headers.service';

@Injectable()
export class AccountService {
    private url = apiUrl;
    public details: object;
    // public claims: Object;
    public isAdmin: boolean;

    constructor(
        private _http: HttpClient,
        private _headersService: HeadersService
    ) { }

    confirm(userId: string, code: string): Observable<AccountRegisterModel[]> {
        const url = `${this.url}api/Account/ConfirmEmail?userId=${userId}&code=${code}`;
        // let bodyString = JSON.stringify(body); // Stringify payload
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        // tslint:disable-next-line:object-literal-shorthand
        const options = { headers: headers}; // Create a request option
        return this._http.get<AccountRegisterModel[]>(url, options).pipe(
            map(res => res),
            // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
            ((error: any) => Observable.throw(error.json() || { Message: 'Server error' })));
    }

    register(body: object): Observable<AccountRegisterModel[]> {

        const url = this.url + 'api/Account/Register';

        // let bodyString = JSON.stringify(body); // Stringify payload
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        const options = { headers }; // Create a request option

        return this._http.post(url, body, options).pipe(
            map(res => res),
            // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
            (error: any) => Observable.throw(error.json() || { Message: 'Server error' }));
    }

    login(obj: AccountLoginModel): Observable<AccountLoginModel[]> {

        const url: string = this.url + 'Token';

        const bodyString = `grant_type=password&username=${obj.Email}&password=${obj.Password}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        const options = { headers }; // Create a request option

        return this._http.post<AccountLoginModel[]>(url, bodyString, options).pipe(
            map(res => res),
            // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
            (error: any) => Observable.throw(error.json() || { Message: 'Server error' }));
    }

    sendPassword(obj: any) {
        const bodyString = `Email=${obj.Email}&RedirectUrl=${obj.RedirectUrl}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        const options = { headers }; // Create a request option
        return this._http.post(`${this.url}api/account/SendForgotPasswordEmail`, bodyString, options)
        .pipe(
            map(res => res),
           (error: any) => Observable.throw(error || { Message: 'Server error' }));
    }

    resetPassword(obj: any) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        const options = { headers }; // Create a request option
        return this._http.post(`${this.url}api/account/ResetPassword`, obj, options)
        .pipe(
            map(res => res),
            (error: any) => Observable.throw(error.json() || { Message: 'Server error' }));
    }

    getDetails() {
        return this._http.get(`${this.url}api/account`, this._headersService.get())
        .pipe(
            map(res => res),
            (error: any) => Observable.throw(error.json() || { Message: 'Server error' }));
    }

    getClaims() {
        return this._http.get(`${this.url}api/account/claims`, this._headersService.get())
        .pipe(
            map(res => res),
            (error: any) => Observable.throw(error.json() || { Message: 'Server error' }));
    }

}

