import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { AuthTokenService } from './auth-token.service';

@Injectable()
export class HeadersService {
    constructor(private _authTokenService: AuthTokenService) { }
    get(): object {
        let headers;
        headers = new HttpHeaders({
            Authorization: this._authTokenService.authToken // 'Content-Type': 'application/json'
        });
        // if (ContentType) headers['Content-Type'] = ContentType;
        return headers;
    }

}
