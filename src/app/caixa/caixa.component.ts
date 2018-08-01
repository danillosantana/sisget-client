import { Component, OnInit, TemplateRef } from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AcaoSistema} from '../classes/util/acao-sistema';
import {CaixaService} from './caixa.service';
import { MensagensService } from '../mensagens/mensagens.service';
import { PoupService } from '../servicos/poup.service';
import {DataTableService} from '../servicos/data-table.service';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css']
})
export class CaixaComponent implements OnInit {

  acaoSistema : AcaoSistema = new AcaoSistema();	
  caixaBean : any;
  meses : any[];
  movimentacaoFinanceira : any;
  caixaParaEncerramento : any;

  constructor(protected caixaService : CaixaService, private mensagemService : MensagensService, 
              private poupService : PoupService, protected dataTableService : DataTableService) { }

  ngOnInit() {
    this.acaoSistema.setaAcaoParaListar();
  }

  /**
   * Inicializa a lista de meses
   */
  inicialiarMeses() {
    if (this.caixaBean.caixa != null && this.caixaBean.caixa.ano != null && this.caixaBean.caixa.ano != undefined) {
      this.caixaService.getMesesDisponiveis(this.caixaBean.caixa.ano).subscribe(
        data => {
          this.meses = data;
          this.caixaBean.caixa.mes = this.meses[0];
        },
        err => {this.mensagemService.addMensagemErro(err.error);}
      );
    }
  }

  /**
   * Prepara para inserção do novo caixa.
   */
  novoCaixa() {
    this.caixaService.validarCaixaEmAberto(new Date().getFullYear()).subscribe(
      data => {
        this.caixaService.getNovoCaixa().subscribe(
          data => {
            this.acaoSistema.setaAcaoParaIncluir();
            this.caixaBean = data;
            console.log('dsaf', this.caixaBean);
            this.inicialiarMeses();
          },
          err => {this.mensagemService.addMensagemErro(err.error);}
        );
        this.acaoSistema.setaAcaoParaIncluir();
      },
      err => {this.mensagemService.addMensagemErro(err.error);}
    );
  }

 /**
  * Seta a ação para listar.
  */
  voltar() {
    this.acaoSistema.setaAcaoParaListar();
    this.inicializarCaixa();
  }

 /**
  * Inicializa o caixa.
  */
  inicializarCaixa() {
    this.caixaBean = {};
    this.caixaBean.caixa = {};
    this.caixaBean.caixa.movimentacoesCaixa = [];
    this.dataTableService.setarDataTable(this.caixaBean.caixa.movimentacoesCaixa);
    this.caixaBean.caixa.ano = new Date().getFullYear();
  }

  /**
   * Inicializa nova movimentação financeira.
   * 
   * @param template 
   */
  novaMovimentacaoFinanceira(template: TemplateRef<any>) {
    this.movimentacaoFinanceira = {};
    this.abrirPopupMovimentacaoFinanceira(template);
  }

  /**
   * Abre o modal da movimentação financeira.
   * 
   * @param template 
   */
  private abrirPopupMovimentacaoFinanceira(template: TemplateRef<any>) {
    this.poupService.show(template);
  }

  /**
   * Adiciona movimentação no caixa.
   * 
   * @param movimentacaoFinanceira 
   */
  adicionarMovimentacao(movimentacaoFinanceira) {
    if (!movimentacaoFinanceira.isAlteracao) {
      movimentacaoFinanceira.indice = this.caixaBean.caixa.movimentacoesCaixa.length;
      this.caixaBean.caixa.movimentacoesCaixa.push(movimentacaoFinanceira);
    } else {
      let indice = movimentacaoFinanceira.indice;
      this.caixaBean.caixa.movimentacoesCaixa[indice] = movimentacaoFinanceira;
    }

    this.dataTableService.setarDataTable(this.caixaBean.caixa.movimentacoesCaixa);
    this.calcularValores();
  }

  /**
   * Calcular valores de entrada, saída e saldo final.
   */
  private calcularValores() {
    this.caixaBean.entradas = 0.0;
    this.caixaBean.saidas = 0.0;
    this.caixaBean.saldoFinal = 0.0;

    if (this.caixaBean.caixa.movimentacoesCaixa.length > 0) {
      this.caixaBean.caixa.movimentacoesCaixa.forEach(item => {
        if (this.caixaService.isOperacaoEntrada(item.tipoOperacao)) {
          this.caixaBean.entradas += item.valor;
        } else {
          this.caixaBean.saidas  += item.valor;
        }
      });

      this.caixaBean.saldoFinal = this.caixaBean.entradas - this.caixaBean.saidas;
      this.caixaBean.saldoFinal = this.caixaBean.saldoFinal + this.caixaBean.saldoAnterior;
    }  
  }
  
  /**
   * Prepara a movimentação financeira para alteração.
   * 
   * @param movimentacao 
   * @param template 
   */
  alterarMovimentacao(movimentacao: any, template: TemplateRef<any>) {
    this.movimentacaoFinanceira = movimentacao;
    this.movimentacaoFinanceira.isAlteracao = true;
    this.abrirPopupMovimentacaoFinanceira(template);
  }

  /**
   * Remove a movimentação financeira do caixa.
   * 
   * @param movimentacao 
   */
  excluirMovimentacao(movimentacao) {
    this.caixaBean.caixa.movimentacoesCaixa.splice(movimentacao.indice, 1);
    this.dataTableService.setarDataTable(this.caixaBean.caixa.movimentacoesCaixa);
    this.calcularValores();
  }

  /**
   * Retorna a classe do css para o saldo final
   */
  protected getClasseSaldos(valor) {
    return valor >= 0 ? 'text-green' : 'text-red';
  }

  /**
   * Retorna a classe do css para o valor.
   * 
   * @param movimentacao 
   */
  protected getClasseValor(movimentacao) {
    return  this.caixaService.isOperacaoEntrada(movimentacao.tipoOperacao) ? 'text-green' : 'text-red';
  }

  /**
   * Salva o caixa.
   */
  protected salvar() {
    this.caixaService.salvar(this.caixaBean.caixa).subscribe(
      data => {
        this.acaoSistema.setaAcaoParaListar();
        this.mensagemService.addMensagemSucesso(data);
      },
      err => {this.mensagemService.addMensagemErro(err.error);}
    ); 
  }

  /**
   * Atualiza o caixa.
   */
  protected alterar() {
    this.caixaService.alterar(this.caixaBean.caixa).subscribe(
      data => {
        this.acaoSistema.setaAcaoParaListar();
        this.mensagemService.addMensagemSucesso(data);
      },
      err => {this.mensagemService.addMensagemErro(err.error);}
    ); 
  }

  /**
   * Recebe o caixa envidado para alteração de suas informações.
   * 
   * @param caixaTO 
   */
  receberCaixaParaAlteracao(caixaTO) {
    this.consultaCaixaBean(caixaTO.id);
    this.inicializarCaixa();
    this.acaoSistema.setaAcaoParaAlterar();
  }
  
  /**
   * Recebe o caixa envidado para visualização de suas informações.
   * 
   * @param caixaTO 
   */
  receberCaixaParaVisualizacao(caixaTO) {
    this.consultaCaixaBean(caixaTO.id);
    this.inicializarCaixa();
    this.acaoSistema.setaAcaoParaVisualizar();
  }

  /**
   * Busca o caixa associado ao id informado.
   * 
   * @param caixaTO 
   */
  private consultaCaixaBean(idCaixa) {
    if (idCaixa != undefined) {
      this.caixaService.getCaixaBean(idCaixa).subscribe(
        data => {
          this.caixaBean = data;
          if (this.caixaBean.caixa.movimentacoesCaixa.length > 0) {
            this.caixaBean.caixa.movimentacoesCaixa.forEach(function(item, index){
              item.indice = index;
            })
          }
          this.dataTableService.setarDataTable(this.caixaBean.caixa.movimentacoesCaixa);
          this.meses = []; 
          this.meses.push(this.caixaBean.caixa.mes);
          this.calcularValores();
        },
        err => {this.mensagemService.addMensagemErro(err.error);}
      );
    }
  }

  /**
   * Realiza o encerramento do caixa.
   * 
   * @param template 
   */
  protected finalizarCaixa(template: TemplateRef<any>) {
    this.caixaParaEncerramento = this.caixaBean.caixa;
    this.poupService.show(template); 
  }

  /**
   * Recebe a mensagem enviado pelo encerramento do caixa.
   * 
   * @param encerramentoRealizado 
   */
  receberEncerramentoRealizado(encerramentoRealizado) {
      if(encerramentoRealizado) {
        this.acaoSistema.setaAcaoParaListar();
        this.caixaParaEncerramento = {};
        this.dataTableService.setarDataTable([]);
      }
  }
}