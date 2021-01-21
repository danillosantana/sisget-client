import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './config/security/auth-guard.service';
import { AdminComponent } from './pages/admin/admin.component';
import { CaixaComponent } from './pages/caixa/caixa.component';
import { LoginComponent } from './pages/login/login.component';

const appRoutes: Routes = [
  {
    path: 'caixa',
    component: CaixaComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '',
    component: AdminComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
  }]},
  // {
  //   path: 'painel-gestor',
  //   loadChildren: () => import('./pages/painel-gestor/painel-gestor.module').then(m => m.PainelGestorModule),
  //   canActivate: [AuthGuard, AuthGuardPainelGestor],
  // },
  {
    path: '**',
    component: LoginComponent
  },
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
