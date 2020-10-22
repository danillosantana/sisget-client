import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MultiSelectModule} from 'primeng/multiselect';
import { MatCardModule } from '@angular/material/card';
import { MenubarModule } from 'primeng/menubar';
import { ScrollPanelModule } from 'primeng/scrollpanel';


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
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    CollapseModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgxMaskModule.forRoot(),
    TableModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    MultiSelectModule,
    MatCardModule,
    MenubarModule,
    ScrollPanelModule
  ],
  providers: [MensagensService, NgLoadingService, HttpService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
