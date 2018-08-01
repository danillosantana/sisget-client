import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { PoupService } from '../../servicos/poup.service';
import {CaixaService} from '../../caixa/caixa.service';
import { MensagensService } from '../../mensagens/mensagens.service';

@Component({
  selector: 'app-movimentacao-caixa',
  templateUrl: './movimentacao-caixa.component.html',
  styleUrls: ['./movimentacao-caixa.component.css']
})
export class MovimentacaoCaixaComponent implements OnInit {

  movimentacaoFinanceira : any;
  tiposOperacoes : any[];
  tiposMovimentacoes : any[];
  mostrarTipoMovimentacao : boolean;

  @Output() enviarMovimentacao = new EventEmitter();
  @Input()	movimentacaoAlterada:	any;

  constructor(private poupService : PoupService, private caixaService : CaixaService, private mensagensService : MensagensService) { }

  ngOnInit() {
    this.inicializarMovimentacaoFinanceira();  
    this.inicializarTiposOperacoes();
  }

  /**
   * Inicializa a movimentação financeira.
   */
  inicializarMovimentacaoFinanceira() {
    if (this.movimentacaoAlterada != null && this.movimentacaoAlterada.isAlteracao) {
      this.movimentacaoFinanceira = this.movimentacaoAlterada; 
    } else {
      this.movimentacaoFinanceira = {};
      this.movimentacaoFinanceira.isAlteracao = false;
    }
  }

  /**
   * Inicializa os tipos de operações.
   */
  inicializarTiposOperacoes() {
      this.caixaService.getTiposOperacaoes().subscribe(
          data => {
            this.tiposOperacoes = data;
            if (this.tiposOperacoes != null && this.tiposOperacoes.length > 0 ) {
              
              
              if (this.movimentacaoFinanceira.tipoOperacao == null 
                || this.movimentacaoFinanceira.tipoOperacao == undefined ) {
                  this.movimentacaoFinanceira.tipoOperacao = this.tiposOperacoes[0];
              } else {
                this.tiposOperacoes.forEach(item =>{
                    if (item.id == this.movimentacaoFinanceira.tipoOperacao.id ) {
                      this.movimentacaoFinanceira.tipoOperacao = item;
                    }
                });
              } 

              this.mostrarTipoMovimentacao = this.caixaService.isOperacaoEntrada(this.movimentacaoFinanceira.tipoOperacao) ;
              this.inicializarTiposMovimentacoes();
            }
          },
          err => {this.mensagensService.addMensagemErro(err.error);}
        );
    
  }

 /**
  * Inicializa os tipos de movimentações.
  */
  inicializarTiposMovimentacoes() {
    if (this.caixaService.isOperacaoEntrada(this.movimentacaoFinanceira.tipoOperacao)) {
      this.caixaService.getTiposMovimentacoes().subscribe(
          data => {
            this.tiposMovimentacoes = data;
            this.mostrarTipoMovimentacao = this.caixaService.isOperacaoEntrada(this.movimentacaoFinanceira.tipoOperacao);
            if (this.tiposMovimentacoes != null && this.tiposMovimentacoes.length > 0) {
             
                if (this.movimentacaoFinanceira.tipoMovimentacao == null 
                  || this.movimentacaoFinanceira.tipoMovimentacao == undefined ) {
                    this.movimentacaoFinanceira.tipoMovimentacao = this.tiposMovimentacoes[0];
                } else {
                  this.tiposMovimentacoes.forEach(item =>{
                      if (item.id == this.movimentacaoFinanceira.tipoMovimentacao.id ) {
                        this.movimentacaoFinanceira.tipoMovimentacao = item;
                      }
                  });
              }
            }
          },
          err => {this.mensagensService.addMensagemErro(err.error);}
        );
      } else {
        this.tiposMovimentacoes = [];
        this.movimentacaoFinanceira.tipoMovimentacao = {};
        this.mostrarTipoMovimentacao = false;
      }  
  }

  /**
   * Fecha o modal da movimentação financeira.
   */
  fecharPopupMovimentacaoFinanceira() {
    this.poupService.hide();
  }

  /**
   * Salva a movimentação financeira.
   */
  salvar() {
    this.caixaService.validarCamposObrigatoriosMovimentoCaixa(this.movimentacaoFinanceira).subscribe(
        data => {
          this.fecharPopupMovimentacaoFinanceira();
          this.enviarMovimentacao.emit(this.movimentacaoFinanceira);
        },
        err => {this.mensagensService.addMensagemErro(err.error);}
      );
  }
}