import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/config/security/token.service';
import { environment } from 'src/environments/environment';
import { LoginBean } from './login-form-build.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private tokenService : TokenService,
              private router : Router) { }

  autenticar(loginBean : LoginBean) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiUrl+'auth', loginBean)
        .subscribe((data : any) => {
          this.tokenService.setToken(data.token);
          location.reload();
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