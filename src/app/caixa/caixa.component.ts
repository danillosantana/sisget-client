import { Component, OnInit, TemplateRef } from '@angular/core';;

import { AcaoSistema } from '../classes/util/acao-sistema';
import { CaixaService } from './caixa.service';
import { PoupService } from '../servicos/poup.service';
import { DataTableService } from '../servicos/data-table.service';
import { MesTO } from '../model/dto/mes.to';
import { MensagemService } from '../servicos/mensagem.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CaixaBean } from '../model/bean/caixa-bean';
import { ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css'],
  providers: [MensagemService]
})
export class CaixaComponent implements OnInit {

  acaoSistema : AcaoSistema = new AcaoSistema();	
  caixaBean : CaixaBean;
  meses : Array<MesTO> = [];
  movimentacaoFinanceira : any;
  caixaParaEncerramento : any;

  @ViewChild('dtMovimentacao') dt: Table;

  constructor(public caixaService : CaixaService, public mensagemService : MensagemService, 
    public poupService : PoupService, public dataTableService : DataTableService) { }

  ngOnInit() {
    this.acaoSistema.setaAcaoParaListar();
  }

  /**
   * Inicializa a lista de meses
   */
  inicialiarMeses() {
    if (this.caixaBean != null && this.caixaBean?.ano != null && this.caixaBean?.ano != undefined) {
      this.caixaService.getMesesDisponiveis(this.caixaBean.ano).subscribe(
        (meses : Array<MesTO>) => {
          this.meses = meses;
          this.caixaBean.mes = this.meses[0];
        }, (httpErrorResponse: HttpErrorResponse) => {
          console.log(httpErrorResponse);
          this.mensagemService.adicionarMensagemErro('Caixa', httpErrorResponse?.error?.message);
        });
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
            this.dataTableService.setarDataTable([]);
            this.acaoSistema.setaAcaoParaIncluir();
            this.caixaBean = data;
            this.inicialiarMeses();
          },
          err => {
            // this.mensagemService.addMensagemErro(err.error);
          }
        );
        this.acaoSistema.setaAcaoParaIncluir();
      },
      err => {
        // this.mensagemService.addMensagemErro(err.error);
      }
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
    this.caixaBean = {};
    this.caixaBean.movimentacoes = [];
    this.caixaBean.ano = new Date().getFullYear();
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
    // this.poupService.show(template);
  }

  /**
   * Adiciona movimentação no caixa.
   * 
   * @param movimentacaoFinanceira 
   */
  adicionarMovimentacao(movimentacaoFinanceira) {
    if (!movimentacaoFinanceira.isAlteracao) {
      movimentacaoFinanceira.indice = this.caixaBean.movimentacoes.length;
      this.caixaBean.movimentacoes.push(movimentacaoFinanceira);
    } else {
      let indice = movimentacaoFinanceira.indice;
      this.caixaBean.movimentacoes[indice] = movimentacaoFinanceira;
    }

    this.dataTableService.setarDataTable(this.caixaBean.movimentacoes);
    this.calcularValores();
  }

  /**
   * Calcular valores de entrada, saída e saldo final.
   */
  private calcularValores() {
    this.caixaBean.entradas = 0.0;
    this.caixaBean.saidas = 0.0;
    this.caixaBean.saldoFinal = 0.0;

    if (this.caixaBean?.movimentacoes?.length > 0) {
      this.caixaBean?.movimentacoes?.forEach(item => {
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
    this.caixaBean.movimentacoes.splice(movimentacao.indice, 1);
    this.dataTableService.setarDataTable(this.caixaBean.movimentacoes);
    this.calcularValores();
  }

  /**
   * Retorna a classe do css para o saldo final
   */
 getClasseSaldos(valor) {
    return valor >= 0 ? 'text-green' : 'text-red';
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
   * Salva o caixa.
   */
  salvar() {
    this.caixaService.salvar(this.caixaBean).subscribe(
      data => {
        this.acaoSistema.setaAcaoParaListar();
        // this.mensagemService.addMensagemSucesso(data);
      },
      err => {
        // this.mensagemService.addMensagemErro(err.error);
      }
    ); 
  }

  /**
   * Atualiza o caixa.
   */
   alterar() {
    this.caixaService.alterar(this.caixaBean).subscribe(
      data => {
        this.acaoSistema.setaAcaoParaListar();
        // this.mensagemService.addMensagemSucesso(data);
      },
      err => {
        // this.mensagemService.addMensagemErro(err.error);
      }
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
      this.caixaService.getCaixaBean(idCaixa)
      .toPromise().then(
        (caixa : CaixaBean) => {
          this.caixaBean = caixa;
          if (this.caixaBean?.movimentacoes?.length > 0) {
            this.caixaBean.movimentacoes.forEach(function(item, index){
              item.indice = index;
            })
          }
          this.meses = []; 
          this.meses.push(this.caixaBean?.mes);
          this.calcularValores();
        }, (httpErrorResponse: HttpErrorResponse) => {
          console.log(httpErrorResponse);
          this.mensagemService.adicionarMensagemErro('Caixa', httpErrorResponse?.error?.message);
        });
    }
  }

  /**
   * Realiza o encerramento do caixa.
   * 
   * @param template 
   */
  finalizarCaixa(template: TemplateRef<any>) {
    this.caixaParaEncerramento = this.caixaBean;
    // this.poupService.show(template); 
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