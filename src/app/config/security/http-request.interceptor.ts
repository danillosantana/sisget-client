import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from '../security/token.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MensagemService } from 'src/app/servicos/mensagem.service';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

constructor(public tokenService : TokenService,
            public router : Router,
            public mensagemService : MensagemService) {}


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

      if (err.status === 401) {
        err.message =  "Login Expirado!! Faça Login Novamente!!!";
        this.router.navigate(['login']);
        this.tokenService.removeToken();
        return throwError(err);
      }

      if (err.status === 403) {
          err.message = 'Você não posui permissão para realizar essa operação. Contate o Administrador';

          return throwError(err);
      }
      
      err.message = err.error.reason;
      return throwError(err);
  }));
  }
}
    