import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserSessionService } from './user-session.service';
import { UsuarioSession } from 'src/app/model/bean/usuario-session';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService : AuthService,
              private router: Router,
              private usuarioSessionService : UserSessionService) { }

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    if (!this.authService.isAutenticado()) {
      this.router.navigate(['login']);
      return false;
    }

    if (route && route.data && route.data.roles) {
       const usuarioSession: UsuarioSession = this.usuarioSessionService.getUsuarioSession();
    
       return route.data.roles.includes(usuarioSession.role);
    }
    
    return true;
  }
}