import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TokenService } from './config/security/token.service';
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
              public mensagemService : MensagemService) {

  }

  ngOnInit(): void {
    this.inicializarMenu();
    this.router.navigate(['/caixa']);
  }

  inicializarMenu() {
    this.items = [
      {
        label: 'Administração',
        icon: 'pi pi-cog',
        items : [
          {
            label: 'Usuários', 
            icon: 'pi pi-users',
            routerLink: '/usuarios'
          },
          {
            label: 'Permissões', 
            icon: 'pi pi-lock',
            routerLink: '/permissoes'
          }
        ]
      },
      {
          label: 'Caixa',
          icon: 'pi pi-inbox',
          routerLink: '/caixa'
      }
  ];
  }
  
  getAno() {
    return new Date().getFullYear();
  }

  logout() {
    this.mensagemService.dialogConfirm('Deseja Realmente Sair?')
      .then((result) => {
          if (result.isConfirmed) {
            this.loginService.logout();
          }
      });
  }
}
