import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserSessionService } from './user-session.service';
import { UsuarioSession } from 'src/app/model/bean/usuario-session';
import { TokenService } from './token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MensagemService } from 'src/app/servicos/mensagem.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router,
              public tokenService : TokenService,
              public usuarioSessionService : UserSessionService,
              public mensagemService : MensagemService) { }

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    const token = this.tokenService.getToken();
    const helper = new JwtHelperService();
    
    if (this.tokenService.getToken() &&  helper.isTokenExpired(token)) {
      this.tokenService.removeToken();
      this.router.navigate(['login']);
      return false;
    }

    if (this.tokenService.getToken() === null || this.tokenService.getToken() === undefined) {
      this.router.navigate(['login']);
      return false;
    }

    if (route && route.data && route.data.permissoes) {
       const usuarioSession: UsuarioSession = this.usuarioSessionService.getUsuarioSession();
    
       let possuiPermissao : boolean = false;
       route.data.permissoes.forEach(p => {
         let permissaoEncontrada = usuarioSession.permissoes?.filter(permissao => permissao === p)?.length > 0;
         if (permissaoEncontrada) {
            possuiPermissao = true;
         }
       }); 

       return possuiPermissao;
    }
    
    return true;
  }
}