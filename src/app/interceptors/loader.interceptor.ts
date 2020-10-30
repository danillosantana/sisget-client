import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize, tap } from 'rxjs/operators';
import { LoaderService } from '../shared/loader/loader.service';


@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('passei loader');
      
    return next.handle(req).pipe(
      delay(0),
      tap(() => this.loaderService.show()),
      finalize(() => this.loaderService.hide())
    );
  }
}
