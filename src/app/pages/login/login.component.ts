import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MensagemService } from 'src/app/servicos/mensagem.service';
import { FormBuilderUtil } from 'src/app/util/form-builder-util';
import { LoginBean, LoginFormBuildService } from './login-form-build.service';
import { LoginService } from './login-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginFormBuildService]
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  @ViewChild('inputEmail') inputEmail: ElementRef;

  constructor(public loginFormBuildService : LoginFormBuildService,
              public loginService : LoginService,
              public mensagemService : MensagemService,
              public route : Router) { }

  ngOnInit(): void {
    this.construirForm();
  }

  construirForm() {
    const login = new LoginBean();
    this.formLogin = this.loginFormBuildService.buildForm(login);
  }


  logar() {
    let login = FormBuilderUtil.parseForEntity(this.formLogin, new LoginBean()); 
    this.loginService.autenticar(login)
      .then(() => {
        this.limpar();
        this.route.navigate(['caixa']);
      }, data => {
        this.mensagemService.adicionarMensagemErro('Login', data);
      })
  }

  limpar() {
    this.formLogin.reset();
  }

}
