import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes  } from '@angular/router';

import { AlertModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';
import { NgxMaskModule } from 'ngx-mask'

import { AppComponent } from './app.component';
import { CaixaComponent } from './components/caixa/caixa.component';
import { ListaCaixaComponent } from './components/caixa/lista-caixa/lista-caixa.component';
import { MovimentacaoCaixaComponent } from './components/caixa/movimentacao-caixa/movimentacao-caixa.component';
import { MensagensComponent } from './mensagens/mensagens.component';
import { MensagensService } from './mensagens/mensagens.service';
import {NgLoadingService} from './ng-loading/ng-loading.service';
import { HttpService } from './servicos/http-service.service';
import { FechamentoCaixaComponent } from './components/caixa/fechamento-caixa/fechamento-caixa.component';
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
import { DynamicDialogModule, FullCalendarModule, ToastModule } from 'primeng';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LoaderComponent } from './components/loader/loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

registerLocaleData(localePt, 'pt');

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
    ContaComponent,
    LoaderComponent
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
    ScrollPanelModule,
    DynamicDialogModule,
    DynamicDialogModule,
    ToastModule,
    FullCalendarModule,
    CurrencyMaskModule,
    NgxSpinnerModule
  ],
  providers: [MensagensService, 
              NgLoadingService, 
              HttpService, 
              {provide: LOCALE_ID, useValue: 'pt'},
              {
                provide: HTTP_INTERCEPTORS,
                useClass: LoaderInterceptor,
                multi: true,
              }
            ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    MovimentacaoCaixaComponent
  ],
})
export class AppModule { }
