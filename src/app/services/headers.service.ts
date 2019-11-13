import { Injectable } from '@angular/core';
import { HttpHeaders} from '@angular/common/http';
import { AuthTokenService } from './auth-token.service';

@Injectable()
export class HeadersService {
    // apiKey: string;

    constructor(private _authTokenService: AuthTokenService) { }

    set apiKey(val) {
        localStorage.setItem('api-key', val);
    }

    get apiKey() {
        return localStorage.getItem('api-key');
    }

    get(): object {
        let headers;
        if (this.apiKey) {
            headers = new HttpHeaders({ 'api-key': this.apiKey });
        } else {
            headers = new HttpHeaders({
                Authorization: this._authTokenService.authToken // 'Content-Type': 'application/json'
            });
        }

        // if (ContentType) headers['Content-Type'] = ContentType;

        return headers;
    }

}
