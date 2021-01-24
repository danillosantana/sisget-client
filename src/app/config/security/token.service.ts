import { Injectable } from '@angular/core';

const TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  hasToken() {
    return !!this.getToken();
  }

  setToken(token) {
    window.localStorage.setItem(TOKEN, token);
  }

  getToken() {
    return window.localStorage.getItem(TOKEN); 
  }

  removeToken() {
    window.localStorage.removeItem(TOKEN);
  }
}
