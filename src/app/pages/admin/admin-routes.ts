import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { ManterUsuarioComponent } from './manter-usuario/manter-usuario.component';
import { AuthGuardService } from 'src/app/config/security/auth-guard.service';
import { Permissoes } from 'src/app/model/enum/permissoes.enum';



export const AdminRoutes: Routes = [
  { path: 'usuarios',      component: ManterUsuarioComponent , canActivate: [AuthGuardService], data: {permissoes : [Permissoes.ADMINISTRACAO_SISTEMA]}},
];
