import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthGuardService } from './config/security/auth-guard.service';
import { TokenService } from './config/security/token.service';
import { UserSessionService } from './config/security/user-session.service';
import { UsuarioSession } from './model/bean/usuario-session';
import { Permissoes } from './model/enum/permissoes.enum';
import { LoginService } from './pages/login/login-service';
import { MensagemService } from './servicos/mensagem.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(public router: Router,
              public loginService : LoginService,
              public mensagemService : MensagemService,
              public usuarioSessionService : UserSessionService) {

  }

  ngOnInit(): void {
  }

  getAno() {
    return new Date().getFullYear();
  }
}
