import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogConfig } from 'primeng';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MensagensService } from 'src/app/mensagens/mensagens.service';
import { TipoMovimentacaoTO } from 'src/app/model/dto/tipo-movimentacao.to';
import { TipoOperacaoTO } from 'src/app/model/dto/tipo-operacao.to';
import { MensagemService } from 'src/app/servicos/mensagem.service';
import { FormBuilderUtil } from 'src/app/util/form-builder-util';
import {CaixaService} from '../../caixa/caixa.service';
import { MovimentacaoBean, MovimentacaoFormBuilderService } from './movimentacao-caixa-form-builder';


@Component({
  selector: 'app-movimentacao-caixa',
  templateUrl: './movimentacao-caixa.component.html',
  styleUrls: ['./movimentacao-caixa.component.css'],
  providers: [DialogService, MovimentacaoFormBuilderService]
})
export class MovimentacaoCaixaComponent implements OnInit {

  tiposOperacoes : Array<TipoOperacaoTO>;
  tiposMovimentacoes : Array<TipoMovimentacaoTO>;
  mostrarTipoMovimentacao : boolean;
  formMovimentacao: FormGroup;

  @Output() enviarMovimentacao : EventEmitter<any> = new EventEmitter<any>();
  @Input()	movimentacaoAlterada:	any;

  constructor(public dialogRef: DynamicDialogRef,
              public config: DynamicDialogConfig,
              public caixaService : CaixaService, 
              public mensagensService : MensagensService,
              public movimentacaoFormBuilderService : MovimentacaoFormBuilderService,
              public mensagemService : MensagemService) { }

  ngOnInit() {
    this.construirForm();  
    this.buscarListas()
          .then(() => {
            this.atualizarComportamentoInicial();
          });
  }

  construirForm() {
    const movimentacao = new MovimentacaoBean();
    this.formMovimentacao = this.movimentacaoFormBuilderService.buildForm(movimentacao);
  }

  atualizarComportamentoInicial() {
    if (this.config?.data?.movimentacao) {
      const movimentacao : MovimentacaoBean = this.config?.data?.movimentacao;
      this.formMovimentacao.controls.id.setValue(movimentacao?.id);
      this.formMovimentacao.controls.indice.setValue(movimentacao?.indice);
      this.formMovimentacao.controls.descricao.setValue(movimentacao?.descricao);

      this.setarTipoOperacoes(movimentacao);
      this.setarTipoMovimentacao(movimentacao);
      this.formMovimentacao.controls.valor.setValue(movimentacao.valor);
      this.movimentacaoFormBuilderService.atualizarControls(this.formMovimentacao);
    } else {
      this.formMovimentacao.controls.tipoOperacao.setValue(this.tiposOperacoes[0]); 
      this.formMovimentacao.controls.tipoMovimentacao.setValue(this.tiposMovimentacoes[0]);
    }

    this.mostrarTipoMovimentacao = this.caixaService.isOperacaoEntrada(this.formMovimentacao.controls.tipoOperacao.value) ;
  }

  setarTipoOperacoes(movimentacao : MovimentacaoBean) {
    this.tiposOperacoes.forEach(tp => {
      if (tp.id === movimentacao.tipoOperacao.id) {
       this.formMovimentacao.controls.tipoOperacao.setValue(tp);
      }
    });
  }

  setarTipoMovimentacao(movimentacao : MovimentacaoBean) {
    if (this.tiposMovimentacoes?.length ) {
      this.tiposMovimentacoes.forEach(tm => {
         if (tm?.id === movimentacao?.tipoMovimentacao?.id) {
           this.formMovimentacao.controls.tipoMovimentacao.setValue(tm);
         }
      }); 
    }
  }

  buscarListas() {
    return Promise.all([
      this.buscarTiposOperacoes(),
      this.buscarTiposMovimentacoes()
    ]);
  }

  /**
   * Inicializa os tipos de operações.
   */
  buscarTiposOperacoes() {
     return this.caixaService.getTiposOperacaoes()
        .toPromise().then(
          (tiposOperacoes : Array<TipoOperacaoTO>) => {
            this.tiposOperacoes = tiposOperacoes;
          }, (httpErrorResponse: HttpErrorResponse) => {
            this.mensagemService.adicionarMensagemErro('Movimentação Caixa', httpErrorResponse?.error?.message);
          });
    
  }

 /**
  * Inicializa os tipos de movimentações.
  */
  buscarTiposMovimentacoes() {
     return  this.caixaService.getTiposMovimentacoes().toPromise().then(
          (tiposMovimentacoes : Array<TipoMovimentacaoTO>) => {
            this.tiposMovimentacoes = tiposMovimentacoes;
          }, (httpErrorResponse: HttpErrorResponse) => {
            this.mensagemService.adicionarMensagemErro('Movimentação Caixa', httpErrorResponse.error.message);
          });
  }

  /**
   * Fecha o modal da movimentação financeira.
   */
  fecharPopupMovimentacaoFinanceira() {
    this.dialogRef.close();
  }

  /**
   * Salva a movimentação financeira.
   */
  salvar() {
    let movimentacao = FormBuilderUtil.parseForEntity(this.formMovimentacao, new MovimentacaoBean()); 
  
    this.caixaService.validarCamposObrigatoriosMovimentoCaixa(movimentacao)
    .toPromise().then(
        () => {
          this.dialogRef.close(movimentacao);
        }, (httpErrorResponse: HttpErrorResponse) => {
          this.mensagemService.adicionarMensagemErro('Movimentação Caixa', httpErrorResponse.error.message);
        });
  }

  changeTipoOperacao(event) {
    this.mostrarTipoMovimentacao = event?.value?.id !== 2;
  }
}