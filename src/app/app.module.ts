import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes  } from '@angular/router';
import { AppComponent } from './app.component';
import { CaixaComponent } from './components/caixa/caixa.component';
import { ListaCaixaComponent } from './components/caixa/lista-caixa/lista-caixa.component';
import { MovimentacaoCaixaComponent } from './components/caixa/movimentacao-caixa/movimentacao-caixa.component';
import {NgLoadingService} from './ng-loading/ng-loading.service';
import { HttpService } from './servicos/http-service.service';
import { FechamentoCaixaComponent } from './components/caixa/fechamento-caixa/fechamento-caixa.component';
import { NgLoadingComponent } from './ng-loading/ng-loading.component';
import { AutoFocusDirective } from './diretivas/auto-focus.directive';
import { SortColumnDirective } from './diretivas/sort-column.directive';
import { FilterColumnDirective } from './diretivas/filter-column.directive';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MultiSelectModule} from 'primeng/multiselect';
import { MatCardModule } from '@angular/material/card';
import { MenubarModule } from 'primeng/menubar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LoaderComponent } from './components/loader/loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import {FileUploadModule} from 'primeng/fileupload';
import { MovimentacoesPorTipoComponent } from './components/caixa/movimentacoes-por-tipo/movimentacoes-por-tipo.component';
import { FileUploadComponent } from './shared/file-upload/file-upload.component';


registerLocaleData(localePt, 'pt');

/**
 * Configuração de Rotas.
 */
const appRoutes: Routes = [
  { path: 'caixa',  component: CaixaComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CaixaComponent,
    ListaCaixaComponent,
    MovimentacaoCaixaComponent,
    FechamentoCaixaComponent,
    NgLoadingComponent,
    AutoFocusDirective,
    SortColumnDirective,
    FilterColumnDirective,
    LoaderComponent,
    MovimentacoesPorTipoComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    TableModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    MultiSelectModule,
    MatCardModule,
    MenubarModule,
    ScrollPanelModule,
    DynamicDialogModule,
    ToastModule,
    CurrencyMaskModule,
    NgxSpinnerModule,
    FileUploadModule
  ],
  providers: [NgLoadingService, 
              HttpService, 
              DialogService,
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
