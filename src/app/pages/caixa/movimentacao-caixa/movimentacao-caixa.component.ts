import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ComprovanteMovimentacaoTO } from 'src/app/model/dto/comprovante-movimentacao.to';
import { TipoMovimentacaoTO } from 'src/app/model/dto/tipo-movimentacao.to';
import { TipoOperacaoTO } from 'src/app/model/dto/tipo-operacao.to';
import { TipoOperacao } from 'src/app/model/enum/tipo-operacao.enum';
import { ArquivoService } from 'src/app/servicos/arquivo.service';
import { MensagemService } from 'src/app/servicos/mensagem.service';
import { FormBuilderUtil } from 'src/app/util/form-builder-util';
import {CaixaService} from '../caixa.service';
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
  @Input()	movimentacaoAlterada:	MovimentacaoBean;

  @ViewChild('inputDescricao') inputDescricao: ElementRef;

  TipoOperacao = TipoOperacao;

  constructor(public dialogRef: DynamicDialogRef,
              public config: DynamicDialogConfig,
              public caixaService : CaixaService, 
              public movimentacaoFormBuilderService : MovimentacaoFormBuilderService,
              public mensagemService : MensagemService,
              public arquivoService : ArquivoService) { }

  ngOnInit() {
    this.construirForm();  
    this.buscarListas()
          .then(() => {
            this.atualizarComportamentoInicial();
            this.inputDescricao.nativeElement.focus();
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
      this.formMovimentacao.controls.comprovante.setValue(movimentacao?.comprovante);
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
            this.mensagemService.adicionarMensagemErro('Movimentação Caixa', httpErrorResponse?.message);
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
            this.mensagemService.adicionarMensagemErro('Movimentação Caixa', httpErrorResponse.message);
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
          this.mensagemService.adicionarMensagemErro('Movimentação Caixa', httpErrorResponse.message);
        });
  }

  changeTipoOperacao(event) {
    this.mostrarTipoMovimentacao = event?.value?.id !== 2;
  }

  removerArquivo() {
    if (this.formMovimentacao?.controls?.id?.value) {
       const idMovimentacaoCaixa = this.formMovimentacao.controls.id.value;
       const idComprovante = this.formMovimentacao?.controls?.comprovante?.value?.id;
       this.caixaService.deletarComprovanteMovimentacao(idMovimentacaoCaixa, idComprovante)
            .toPromise()
            .then(() => {
              this.formMovimentacao.controls.comprovante.setValue(undefined);  
            }, (httpErrorResponse: HttpErrorResponse) => {
              console.log(httpErrorResponse);
              this.mensagemService.adicionarMensagemErro('Movimentacao Caixa', httpErrorResponse?.message);
            });
    } else if (this.formMovimentacao?.controls?.comprovante?.value?.id) {
      const id = this.formMovimentacao.controls.comprovante.value.id;
      this.arquivoService.deletarComprovante(id)
          .toPromise()
          .then(() => {
            this.formMovimentacao.controls.comprovante.setValue(undefined);
          }, (httpErrorResponse: HttpErrorResponse) => {
            console.log(httpErrorResponse);
            this.mensagemService.adicionarMensagemErro('Movimentacao Caixa', httpErrorResponse?.message);
          });
    }
  }

  upload(event) {
    if (event?.target?.files?.length > 0) {
      const file = event.target.files[0];
      this.arquivoService.uploadComprovante(file)
      .toPromise()
      .then((arquivo : ComprovanteMovimentacaoTO) => {
              this.formMovimentacao.controls.comprovante.setValue(arquivo);
            }, (httpErrorResponse: HttpErrorResponse) => {
              console.log(httpErrorResponse);
              this.mensagemService.adicionarMensagemErro('Movimentacao Caixa', httpErrorResponse?.message);
            });
    }
  }
}