import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { UserSessionService } from 'src/app/config/security/user-session.service';
import { UsuarioSession } from 'src/app/model/bean/usuario-session';
import { UsuarioTO } from 'src/app/model/dto/usuario.to';
import { MensagemService } from 'src/app/servicos/mensagem.service';
import { AlterarSenhaUsuarioComponent } from '../admin/manter-usuario/alterar-senha-usuario/alterar-senha-usuario.component';
import { UsuarioService } from '../admin/manter-usuario/usuario.service';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {

  usuarioSession : UsuarioSession;
  usuario : UsuarioTO;

  constructor(public usuarioSessionService : UserSessionService,
              public usuarioService : UsuarioService,
              public mensagemService : MensagemService,
              public dialogService : DialogService) { }

  ngOnInit(): void {
    this.usuarioSession = this.usuarioSessionService.getUsuarioSession();
    this.buscarUsuario();
  }

  buscarUsuario() {
    this.usuarioService.getUsuarioPorId(this.usuarioSession.id)
          .toPromise()
          .then((usuario : UsuarioTO) => {
              this.usuario = usuario;
            }, (httpErrorResponse: HttpErrorResponse) => {
              this.mensagemService.adicionarMensagemErro('Conta', httpErrorResponse?.error?.message);
          });
  }

  abrirModalAlteracaoSenha() {
    this.dialogService.open(AlterarSenhaUsuarioComponent, {
      data: { usuario: this.usuario },
      width: '50vw',
      closeOnEscape: true,
      closable: true,
      header : 'Alteração de Senha / ' + this.usuario.nome
    });
  }
}
