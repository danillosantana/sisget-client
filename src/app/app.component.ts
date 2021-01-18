import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TokenService } from './config/security/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(public router: Router,
              public tokenService : TokenService) {

  }

  ngOnInit(): void {
    if (this.tokenService.hasToken()) {
      this.inicializarMenu();
    }
    this.router.navigate(['/caixa']);
  }

  inicializarMenu() {
    this.items = [
      {
        label: 'Administração',
        icon: 'pi pi-cog',
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
}
