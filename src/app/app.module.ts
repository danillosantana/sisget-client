import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AlertModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { PaginationModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

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


@NgModule({
  declarations: [
    AppComponent,
    CaixaComponent,
    ListaCaixaComponent,
    MensagensComponent,
    MovimentacaoCaixaComponent,
    FechamentoCaixaComponent,
    NgLoadingComponent,
    AutoFocusDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    CurrencyMaskModule,
    PaginationModule.forRoot(),
    CollapseModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [MensagensService, NgLoadingService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
