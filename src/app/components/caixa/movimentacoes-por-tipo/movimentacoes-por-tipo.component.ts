import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { AcaoSistema } from 'src/app/classes/util/acao-sistema';
import { ArquivoService } from 'src/app/servicos/arquivo.service';
import { MensagemService } from 'src/app/servicos/mensagem.service';
import { CaixaService } from '../caixa.service';
import { MovimentacaoBean } from '../movimentacao-caixa/movimentacao-caixa-form-builder';
import { VisualizaComprovanteComponent } from '../visualiza-comprovante/visualiza-comprovante.component';

@Component({
  selector: 'app-movimentacoes-por-tipo',
  templateUrl: './movimentacoes-por-tipo.component.html',
  styleUrls: ['./movimentacoes-por-tipo.component.css']
})
export class MovimentacoesPorTipoComponent implements OnInit {

  @Input() movimentacoes : Array<MovimentacaoBean>;
  @Input() tipoOperacao : number;
  @Input() acaoSistema : AcaoSistema;

  @Output() notificarAlteracaoModificacoes : EventEmitter<any> = new EventEmitter<any>(); 
  @Output() notificarPoupModificacaoFinanceira : EventEmitter<MovimentacaoBean> = new EventEmitter<any>(); 

  @ViewChild('dtMovimentacao') dtMovimentacao: Table;

  movimentacaoFinanceira : any;

  constructor(public caixaService : CaixaService,
              public mensagemService : MensagemService,
              public dialogService : DialogService,
              public arquivoService : ArquivoService,
              private sanitizer : DomSanitizer) { }

  ngOnInit(): void {
  }

   /**
   * Prepara a movimentação financeira para alteração.
   * 
   * @param movimentacao 
   * @param template 
   */
  alterarMovimentacao(movimentacao: MovimentacaoBean, indice : number) {
    movimentacao.indice = indice;
    this.movimentacaoFinanceira = movimentacao;
    this.abrirPopupMovimentacaoFinanceira(movimentacao);
  }

  /**
   * Remove a movimentação financeira do caixa.
   * 
   * @param movimentacao 
   */
  excluirMovimentacao(indice : number) {
    this.mensagemService.dialogConfirm('Confirma a exclusão da movimentação?')
      .then((result) => {
          if (result.isConfirmed) {
            this.movimentacoes.splice(indice, 1);
            this.notificarAlteracaoModificacoes.emit();
          }
      });
  }

  /**
   * Retorna a classe do css para o valor.
   * 
   * @param movimentacao 
   */
  getClasseValor(movimentacao) {
    return  this.caixaService.isOperacaoEntrada(movimentacao.tipoOperacao) ? 'text-green' : 'text-red';
  }

  /**
   * Adiciona movimentação no caixa.
   * 
   * @param movimentacaoFinanceira 
   */
  adicionarMovimentacao(movimentacaoFinanceira : MovimentacaoBean) {
    if (!this.movimentacoes?.length) {
      this.movimentacoes = [];  
    }

    if (movimentacaoFinanceira.indice !== null && movimentacaoFinanceira.indice >= 0) {
      let indice = movimentacaoFinanceira.indice;
      this.movimentacoes[indice] = movimentacaoFinanceira;
    } else {
      this.movimentacoes.push(movimentacaoFinanceira);
    }
    
    this.notificarAlteracaoModificacoes.emit();
  }

  /**
   * Inicializa nova movimentação financeira.
   * 
   * @param template 
   */
  novaMovimentacaoFinanceira() {
    this.movimentacaoFinanceira = {};
    this.abrirPopupMovimentacaoFinanceira(undefined);
  }

  abrirPopupMovimentacaoFinanceira(movimentacao : MovimentacaoBean) {
    this.notificarPoupModificacaoFinanceira.emit(movimentacao);
  }

  visualizarComprovante(id : number) {
    this.arquivoService.downloadComprovante(id).toPromise().then(
      (comprovante : any ) => {
        if (comprovante) {
          console.log('comprovante', comprovante);
          var fileURL = URL.createObjectURL(comprovante);
          let image = this.sanitizer.bypassSecurityTrustUrl(fileURL);
          this.abrirVisualizadorComprovante(image);
        }
      }, (httpErrorResponse: HttpErrorResponse) => {
          this.mensagemService.adicionarMensagemErro('Caixas', httpErrorResponse?.error?.message);
        });;
  }

  abrirVisualizadorComprovante(img : any) {
    this.dialogService.open(VisualizaComprovanteComponent, {
      data: { img: img },
      width: '50vw',
      closeOnEscape: true,
      closable: true,
      header : 'Visualizador de Comprovante'
    });
  }
}
