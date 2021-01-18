import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from '../security/token.service';
import { map, catchError } from 'rxjs/operators';
// import { MessageCode } from 'app/util/message-code';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

constructor(private tokenService : TokenService) {}


intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.tokenService.getToken()) {
        request = request.clone({
          setHeaders: {
            'Authorization': this.tokenService.getToken()
          }
        }); 
    }

    return next.handle(request).pipe(catchError(err => {
      console.log(err);
      if (err.status === 403) {
          // err.message = MessageCode.MSG_003;
          err.message = 'Forbiden';
          return throwError(err);
      }

      err.message = err.error.message;
      return throwError(err);
  }));
  }
}
    