import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './config/security/auth-guard.service';
import { CaixaComponent } from './pages/caixa/caixa.component';
import { LoginComponent } from './pages/login/login.component';

const appRoutes: Routes = [
  {
    path: 'caixa',
    component: CaixaComponent,
    canActivate: [AuthGuardService],
  },
  // {
  //   path: 'cadastro-do-processo',
  //   loadChildren: () => import('./pages/gerenciamento-atividades/gerenciador-processo/gerenciador-processo.module').then(m => m.GerenciadorProcessoModule),
  //   canActivate: [AuthGuard],
  // },
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
