import { Injectable } from '@angular/core';
// import { HttpHeaders , XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LogOutService } from './log-out.service';



@Injectable()
 export class HttpExtendedService {
//   private router;
//   private _logOutService;

//   constructor(
//     backend: XHRBackend,
//     options: RequestOptions,
//     router: Router,
//     _logOutService: LogOutService
//   ) {
//     super(backend, options);
//     this.router = router;
//     this._logOutService = _logOutService;
//   }

//   request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
//     return super.request(url, options).catch(this.catchAuthError(this));
//   }

//   private catchAuthError(self: HttpExtendedService) {
//     // we have to pass HttpService's own instance here as `self`
//     return (res: Response) => {
//       // console.log(res);
//       if (res.status === 404) {
//         // it's not a good practice to always redirect to page 404 because of http request returns 404
//         // this same approach will be set specifically in places where it is neccessary
//         // this.router.navigate(['/', '404']);
//       }
//       if (res.status === 401) {
//         // if not authenticated
//         console.log(res);
//         // this._logOutService.logOut();
//       }
//       if (res.status === 403) {
//         // if not authenticated
//         console.log(res);
//       }
//       return Observable.throw(res);
//     };
//   }
}

