import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes  } from '@angular/router';

import { AlertModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';
import { NgxMaskModule } from 'ngx-mask'

import { AppComponent } from './app.component';
import { CaixaComponent } from './caixa/caixa.component';
import { ListaCaixaComponent } from './caixa/lista-caixa/lista-caixa.component';
import { MovimentacaoCaixaComponent } from './caixa/movimentacao-caixa/movimentacao-caixa.component';
import { MensagensComponent } from './mensagens/mensagens.component';
import { MensagensService } from './mensagens/mensagens.service';
import {NgLoadingService} from './ng-loading/ng-loading.service';
import { HttpService } from './servicos/http-service.service';
import { FechamentoCaixaComponent } from './caixa/fechamento-caixa/fechamento-caixa.component';
import { NgLoadingComponent } from './ng-loading/ng-loading.component';
import { AutoFocusDirective } from './diretivas/auto-focus.directive';
import { SortColumnDirective } from './diretivas/sort-column.directive';
import { FilterColumnDirective } from './diretivas/filter-column.directive';
import { ListaContaComponent } from './lista-conta/lista-conta.component';
import { ContaComponent } from './lista-conta/conta/conta.component';
import {TableModule} from 'primeng/table';

/**
 * Configuração de Rotas.
 */
const appRoutes: Routes = [
  { path: 'caixa',  component: CaixaComponent },
  { path: 'conta',  component: ListaContaComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CaixaComponent,
    ListaCaixaComponent,
    MensagensComponent,
    MovimentacaoCaixaComponent,
    FechamentoCaixaComponent,
    NgLoadingComponent,
    AutoFocusDirective,
    SortColumnDirective,
    FilterColumnDirective,
    ListaContaComponent,
    ContaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    CollapseModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgxMaskModule.forRoot(),
    TableModule
  ],
  providers: [MensagensService, NgLoadingService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
