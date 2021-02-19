import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserSessionService } from 'src/app/config/security/user-session.service';
import { UsuarioSession } from 'src/app/model/bean/usuario-session';
import { Permissoes } from 'src/app/model/enum/permissoes.enum';
import { MensagemService } from 'src/app/servicos/mensagem.service';
import { LoginService } from '../login/login-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  usuarioSession : UsuarioSession;
  rigthMenu: MenuItem[] = [];
  leftMenu: MenuItem[] = [];

  constructor(public router: Router,
    public loginService : LoginService,
    public mensagemService : MensagemService,
    public usuarioSessionService : UserSessionService) {
  }

  ngOnInit(): void {
    this.usuarioSession = this.usuarioSessionService.getUsuarioSession();  
    this.inicializarRigthMenu();
    this.inicializarLeftMenu();
    this.router.navigate(['/caixa']);    
  }

  inicializarRigthMenu() {
    this.rigthMenu = [
    // {
    // label: 'Administração',
    // icon: 'pi pi-cog',
    // visible: this.isMenuAdministracaoVisivel(),
    // items : [
    // {
    //   label: 'Usuários', 
    //   icon: 'pi pi-users',
    //   routerLink: '/usuarios'
    // }
    // ]
    // },
    {
    label: 'Caixa',
    icon: 'pi pi-inbox',
    routerLink: '/caixa'
    }
    ];
  }

  inicializarLeftMenu() {
    // this.leftMenu = [
    //     {label : this.usuarioSession?.nome },
    //     {
    //       label: 'Conta', 
    //       icon: 'pi pi-user-plus',
    //       routerLink: '/conta'
    //     },
    //     {
    //       label: 'Logout', 
    //       icon: 'pi pi-power-off',
    //       command : () => this.logout()
    //     } 
    // ];
  }

  logout() {
    this.mensagemService.dialogConfirm('Deseja Realmente Sair?')
    .then((result) => {
    if (result.isConfirmed) {
      this.loginService.logout();
    }
    });
  }

  isMenuAdministracaoVisivel() {
    return this.usuarioSession?.permissoes?.filter(p => p === Permissoes.ADMINISTRACAO_SISTEMA)?.length > 0;
  }

}
