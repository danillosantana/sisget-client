  
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { LoginBean } from 'src/app/model/bean/login-bean';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private tokenService : TokenService,
              private router : Router) { }

  autenticar(loginBean : LoginBean) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiUrl+'auth', loginBean)
        .subscribe((data : any) => {
          this.tokenService.setToken(data.token);
          resolve(undefined);
        }, data => {
          reject(data.error);
        });
    });
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['login']);
  }

  isAutenticado() {
    return this.tokenService.hasToken();
  }
}