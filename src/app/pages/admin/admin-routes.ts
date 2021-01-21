import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManterUsuarioComponent } from './manter-usuario/manter-usuario.component';
import { AuthGuardService } from 'src/app/config/security/auth-guard.service';
import { ManterPermissoesComponent } from './manter-permissoes/manter-permissoes.component';



export const AdminRoutes: Routes = [
  { path: 'usuarios',      component: ManterUsuarioComponent , canActivate: [AuthGuardService]},
  { path: 'permissoes',      component: ManterPermissoesComponent , canActivate: [AuthGuardService]},
];
