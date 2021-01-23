import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MensagemService } from 'src/app/servicos/mensagem.service';
import { FormBuilderUtil } from 'src/app/util/form-builder-util';
import { UsuarioService } from '../usuario.service';
import { UsuarioSenhaBean, UsuarioSenhaFormBuilderService } from './usuario-senha.form-builder.service';

@Component({
  selector: 'app-alterar-senha-usuario',
  templateUrl: './alterar-senha-usuario.component.html',
  styleUrls: ['./alterar-senha-usuario.component.css'],
  providers: [UsuarioSenhaFormBuilderService]
})
export class AlterarSenhaUsuarioComponent implements OnInit {

  formAlteracarSenha: FormGroup;
  visualizarSenha : boolean = false;

  constructor(public formBuilder : UsuarioSenhaFormBuilderService,
              public dialogRef: DynamicDialogRef,
              public config: DynamicDialogConfig,
              public mensagemService : MensagemService,
              public usuarioService : UsuarioService) { }

  ngOnInit(): void {
    this.construirForm();
    this.atualizarComportamentoInicial();
  }

  construirForm() {
    const usuario = new UsuarioSenhaBean();
    this.formAlteracarSenha = this.formBuilder.buildForm(usuario);
  }

  atualizarComportamentoInicial() {
    if (this.config?.data?.usuario) {
        const id = this.config.data.usuario.id;
        this.formAlteracarSenha.controls.id.setValue(id);
    }
  }

  salvar() {
    const usuarioSenha = FormBuilderUtil.parseForEntity(this.formAlteracarSenha, new UsuarioSenhaBean());
    this.usuarioService.alterarSenha(usuarioSenha)
          .toPromise()
          .then(() => {
              this.mensagemService.adicionarMensagemSucesso('Alteração de Senha','Operação Realizada Com Sucesso');
              this.dialogRef.close();
          }, (httpErrorResponse: HttpErrorResponse) => {
            this.mensagemService.adicionarMensagemErro('Alteração de Senha', httpErrorResponse?.error?.message);
        });
  }

  changeVisualizarSenha() {
    this.visualizarSenha = !this.visualizarSenha;
  }
}
