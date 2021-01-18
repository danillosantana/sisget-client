import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import jwt_decode  from 'jwt-decode';
import { UsuarioSession } from 'src/app/model/bean/usuario-session';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  private usuarioSession : UsuarioSession;

  constructor(private tokenService : TokenService) { }

  getUsuarioSession() {
    const token = this.tokenService.getToken().replace('Bearer', '');
    this.usuarioSession = jwt_decode(token); 
    
    return this.usuarioSession; 
  }


}