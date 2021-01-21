import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoutes } from './admin-routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManterUsuarioComponent } from './manter-usuario/manter-usuario.component';
import { ManterPermissoesComponent } from './manter-permissoes/manter-permissoes.component';
import { TableModule } from 'primeng/table';
import { MatCardModule } from '@angular/material/card';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [ManterUsuarioComponent, ManterPermissoesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    MatCardModule,
    ButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule { }
