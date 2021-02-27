import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule  } from '@angular/router';
import { AppComponent } from './app.component';
import { CaixaComponent } from './pages/caixa/caixa.component';
import { ListaCaixaComponent } from './pages/caixa/lista-caixa/lista-caixa.component';
import { MovimentacaoCaixaComponent } from './pages/caixa/movimentacao-caixa/movimentacao-caixa.component';
import { HttpService } from './servicos/http-service.service';
import { FechamentoCaixaComponent } from './pages/caixa/fechamento-caixa/fechamento-caixa.component';
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
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LoaderComponent } from './pages/loader/loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderInterceptor } from './config/interceptors/loader.interceptor';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import {FileUploadModule} from 'primeng/fileupload';
import { MovimentacoesPorTipoComponent } from './pages/caixa/movimentacoes-por-tipo/movimentacoes-por-tipo.component';
import { VisualizaComprovanteComponent } from './pages/caixa/visualiza-comprovante/visualiza-comprovante.component';
import { HttpsRequestInterceptor } from './config/security/http-request.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { AppRoutingModule } from './app.routing.module';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import {SplitButtonModule} from 'primeng/splitbutton';
import { UsuarioComponent } from './pages/admin/manter-usuario/usuario/usuario.component';
import { AlterarSenhaUsuarioComponent } from './pages/admin/manter-usuario/alterar-senha-usuario/alterar-senha-usuario.component';
import { ContaComponent } from './pages/conta/conta.component';
import { PanelModule } from 'primeng/panel';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    CaixaComponent,
    ListaCaixaComponent,
    MovimentacaoCaixaComponent,
    FechamentoCaixaComponent,
    AutoFocusDirective,
    SortColumnDirective,
    FilterColumnDirective,
    LoaderComponent,
    MovimentacoesPorTipoComponent,
    VisualizaComprovanteComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    ContaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
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
    FileUploadModule,
    SplitButtonModule,
    PanelModule
  ],
  providers: [
              HttpService, 
              DialogService,
              {provide: LOCALE_ID, useValue: 'pt'},
              {
                provide: HTTP_INTERCEPTORS,
                useClass: LoaderInterceptor,
                multi: true,
              },
              {
                provide: HTTP_INTERCEPTORS,
                useClass: HttpsRequestInterceptor,
                multi: true,
              }
  ],
  
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  ],
  entryComponents: [
    MovimentacaoCaixaComponent,
    VisualizaComprovanteComponent,
    UsuarioComponent,
    AlterarSenhaUsuarioComponent
  ],
})
export class AppModule { }
