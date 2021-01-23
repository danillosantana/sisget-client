import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { AcaoSistema } from 'src/app/classes/util/acao-sistema';
import { UsuarioTO } from 'src/app/model/dto/usuario.to';
import { MensagemService } from 'src/app/servicos/mensagem.service';
import { AlterarSenhaUsuarioComponent } from './alterar-senha-usuario/alterar-senha-usuario.component';
import { UsuarioService } from './usuario.service';
import { UsuarioBean } from './usuario/usuario-form-builder.service';
import { UsuarioComponent } from './usuario/usuario.component';

@Component({
  selector: 'app-manter-usuario',
  templateUrl: './manter-usuario.component.html',
  styleUrls: ['./manter-usuario.component.css']
})
export class ManterUsuarioComponent implements OnInit {

  usuarios : Array<UsuarioTO> = [];
  acaoSistema : AcaoSistema = new AcaoSistema();

  @ViewChild('dtUsuarios') dtUsuarios: Table;

  constructor(public usuarioService : UsuarioService,
              public mensagemService : MensagemService,
              public dialogService : DialogService) { }

  ngOnInit(): void {
    this.acaoSistema.setaAcaoParaListar();
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


  deletar(usuario : UsuarioTO) {
    this.mensagemService.dialogConfirm('Deseja Realmente Excluir o Usuário '+ usuario.nome + ' ?')
    .then((result) => {
      if (result.isConfirmed) {
          this.usuarioService.deletar(usuario.id)
              .toPromise()
              .then(() => {
                  this.buscarUsuarios();  
                },( httpErrorResponse: HttpErrorResponse) => {
                  this.mensagemService.adicionarMensagemErro('Usuarios', httpErrorResponse?.error?.message);
                });
      }
    });
  }

  novoUsuario() {
    this.abrirModalUsuario(undefined);    
  }

  alterarUsuario(usuario : UsuarioTO) {
    this.abrirModalUsuario(usuario);
  }

  abrirModalUsuario(usuario : UsuarioTO) {
    const modal = this.dialogService.open(UsuarioComponent, {
      data: { usuario: usuario },
      width: '50vw',
      closeOnEscape: true,
      closable: true,
      header : 'Usuario'
    });

    modal.onClose.subscribe(() => {
      this.buscarUsuarios();  
    });
  }


  abrirModalAlteracaoSenha(usuario : UsuarioTO) {
    this.dialogService.open(AlterarSenhaUsuarioComponent, {
      data: { usuario: usuario },
      width: '50vw',
      closeOnEscape: true,
      closable: true,
      header : 'Alteração de Senha / ' + usuario.nome
    });
  }
}
