import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PermissoesTO } from 'src/app/model/dto/permissoes.to';
import { ObjectList } from 'src/app/model/objects/object-list';
import { MensagemService } from 'src/app/servicos/mensagem.service';
import { FormBuilderUtil } from 'src/app/util/form-builder-util';
import { UsuarioService } from '../usuario.service';
import { UsuarioBean, UsuarioFormBuilderService } from './usuario-form-builder.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [DialogService, UsuarioFormBuilderService]
})
export class UsuarioComponent implements OnInit {

  formUsuario: FormGroup;
  permissoes : Array<ObjectList> = [];

  constructor(public dialogRef: DynamicDialogRef,
              public config: DynamicDialogConfig,
              public formBuilder : UsuarioFormBuilderService,
              public usuarioService : UsuarioService,
              public mensagemService : MensagemService) { }

  ngOnInit(): void {
    this.construirForm();
    this.buscarListas()
          .then(() => {
            this.atualizarComportamentoInicial();
          });
  }

  construirForm() {
    const usuario = new UsuarioBean();
    this.formUsuario = this.formBuilder.buildForm(usuario);
  }

  atualizarComportamentoInicial() {
    if (this.config?.data?.usuario?.id) {
      const id = this.config.data.usuario.id;
      this.usuarioService.getUsuarioPorId(id)
            .toPromise()
            .then((usuario : UsuarioBean) => {
              this.formUsuario.controls.id.setValue(usuario.id);
              this.formUsuario.controls.nome.setValue(usuario.nome);
              this.formUsuario.controls.email.setValue(usuario.email);
              this.formUsuario.controls.email.disable();
              this.formUsuario.controls.permissoes.setValue(usuario.permissoes);
            }, (httpErrorResponse: HttpErrorResponse) => {
              this.mensagemService.adicionarMensagemErro('Usuario', httpErrorResponse?.error?.message);
          });
    } 
  }

  buscarListas() {
    return Promise.all([
      this.buscarPermissoes()
    ]);
  }

  buscarPermissoes() {
    this.usuarioService.getPermissoes()
          .toPromise()
          .then((permissoes : Array<PermissoesTO>) => {
              this.permissoes = permissoes.map(p => new ObjectList(p.descricao, p.id));
          }, (httpErrorResponse: HttpErrorResponse) => {
              this.mensagemService.adicionarMensagemErro('Usuario', httpErrorResponse?.error?.message);
          });
  }

  salvar() {
    const usuario = FormBuilderUtil.parseForEntity(this.formUsuario, new UsuarioBean());
    this.usuarioService.salvar(usuario)
          .toPromise()
          .then(() => {
            this.dialogRef.close();
          }, (httpErrorResponse: HttpErrorResponse) => {
            this.mensagemService.adicionarMensagemErro('Usuario', httpErrorResponse?.error?.message);
        });
  }

  alterar() {
    const usuario = FormBuilderUtil.parseForEntity(this.formUsuario, new UsuarioBean());
    this.usuarioService.alterar(usuario)
          .toPromise()
          .then(() => {
            this.dialogRef.close();
          }, (httpErrorResponse: HttpErrorResponse) => {
            this.mensagemService.adicionarMensagemErro('Usuario', httpErrorResponse?.error?.message);
        });
  }
}
