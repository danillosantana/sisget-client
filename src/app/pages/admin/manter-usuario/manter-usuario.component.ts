import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { UsuarioTO } from 'src/app/model/dto/usuario.to';
import { MensagemService } from 'src/app/servicos/mensagem.service';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-manter-usuario',
  templateUrl: './manter-usuario.component.html',
  styleUrls: ['./manter-usuario.component.css']
})
export class ManterUsuarioComponent implements OnInit {

  usuarios : Array<UsuarioTO> = [];

  @ViewChild('dtUsuarios') dtUsuarios: Table;

  constructor(public usuarioService : UsuarioService,
              public mensagemService : MensagemService) { }

  ngOnInit(): void {
    this.buscarUsuarios();
  }

  buscarUsuarios() {
      this.usuarioService.getUsuarios()
          .toPromise()
          .then((usuarios : Array<UsuarioTO>) => {
              this.usuarios = usuarios;
          },( httpErrorResponse: HttpErrorResponse) => {
            this.mensagemService.adicionarMensagemErro('Usuarios', httpErrorResponse?.error?.message);
          });
  }

  novoUsuario() {
    
  }
}
