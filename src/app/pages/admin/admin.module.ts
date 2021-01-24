import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoutes } from './admin-routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManterUsuarioComponent } from './manter-usuario/manter-usuario.component';
import { TableModule } from 'primeng/table';
import { MatCardModule } from '@angular/material/card';
import { ButtonModule } from 'primeng/button';
import { UsuarioComponent } from './manter-usuario/usuario/usuario.component';
import {PanelModule} from 'primeng/panel';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { AlterarSenhaUsuarioComponent } from './manter-usuario/alterar-senha-usuario/alterar-senha-usuario.component';


@NgModule({
  declarations: [ManterUsuarioComponent, UsuarioComponent, AlterarSenhaUsuarioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    MatCardModule,
    ButtonModule,
    PanelModule,
    MultiSelectModule,
    InputTextModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents : [UsuarioComponent, AlterarSenhaUsuarioComponent]
})
export class AdminModule { }
