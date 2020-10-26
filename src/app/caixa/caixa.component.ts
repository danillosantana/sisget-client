import { Component, OnInit, TemplateRef } from '@angular/core';;

import { AcaoSistema } from '../classes/util/acao-sistema';
import { CaixaService } from './caixa.service';
import { PoupService } from '../servicos/poup.service';
import { MesTO } from '../model/dto/mes.to';
import { MensagemService } from '../servicos/mensagem.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CaixaBean } from '../model/bean/caixa-bean';
import { ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { DialogService } from 'primeng';
import { MovimentacaoCaixaComponent } from './movimentacao-caixa/movimentacao-caixa.component';
import { MovimentacaoBean } from './movimentacao-caixa/movimentacao-caixa-form-builder';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css'],
  providers: [MensagemService, DialogService]
})
export class CaixaComponent implements OnInit {

  acaoSistema : AcaoSistema = new AcaoSistema();	
  caixaBean : CaixaBean;
  meses : Array<MesTO> = [];
  movimentacaoFinanceira : any;
  caixaParaEncerramento : any;

  @ViewChild('dtMovimentacao') dt: Table;

  constructor(public caixaService : CaixaService, 
              public mensagemService : MensagemService, 
              public poupService : PoupService, 
              public dialogService : DialogService) { }

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
            this.acaoSistema.setaAcaoParaIncluir();
            this.caixaBean = data;
            this.inicialiarMeses();
          }, (httpErrorResponse: HttpErrorResponse) => {
            console.log(httpErrorResponse);
            this.mensagemService.adicionarMensagemErro('Caixa', httpErrorResponse?.error?.message);
          });
        this.acaoSistema.setaAcaoParaIncluir();
      },(httpErrorResponse: HttpErrorResponse) => {
        console.log(httpErrorResponse);
        this.mensagemService.adicionarMensagemErro('Caixa', httpErrorResponse?.error?.message);
      });
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
  novaMovimentacaoFinanceira() {
    this.movimentacaoFinanceira = {};
    this.abrirPopupMovimentacaoFinanceira(undefined);
  }

  /**
   * Abre o modal da movimentação financeira.
   * 
   * @param template 
   */
  private abrirPopupMovimentacaoFinanceira(movimentacao : MovimentacaoBean) {
    const modal = this.dialogService.open(MovimentacaoCaixaComponent, {
      data: { movimentacao: movimentacao },
      width: '80vw',
      closeOnEscape: true,
      closable: true,
      header : 'Movimentação Caixa'
    });

    modal.onClose.subscribe((movimentacao : MovimentacaoBean) => {
        this.adicionarMovimentacao(movimentacao)
    });

  }

  /**
   * Adiciona movimentação no caixa.
   * 
   * @param movimentacaoFinanceira 
   */
  adicionarMovimentacao(movimentacaoFinanceira : MovimentacaoBean) {
    if (!movimentacaoFinanceira?.id) {
      movimentacaoFinanceira.indice = this.caixaBean.movimentacoes.length;
      this.caixaBean.movimentacoes.push(movimentacaoFinanceira);
    } else {
      let indice = movimentacaoFinanceira.indice;
      this.caixaBean.movimentacoes[indice] = movimentacaoFinanceira;
    }

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
  alterarMovimentacao(movimentacao: any) {
    this.movimentacaoFinanceira = movimentacao;
    this.movimentacaoFinanceira.isAlteracao = true;
    this.abrirPopupMovimentacaoFinanceira(movimentacao);
  }

  /**
   * Remove a movimentação financeira do caixa.
   * 
   * @param movimentacao 
   */
  excluirMovimentacao(movimentacao) {
    this.mensagemService.dialogConfirm('Confirma a exclusão da movimentação?')
      .then((result) => {
          if (result.isConfirmed) {
            this.caixaBean.movimentacoes.splice(movimentacao.indice, 1);
            this.calcularValores();
          }
      });
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
    this.caixaService.salvar(this.caixaBean).toPromise().then(
      (caixaBean : CaixaBean) => {
        this.caixaBean = caixaBean;
        this.processarValoresDefault();
        this.acaoSistema.setaAcaoParaAlterar();
        this.mensagemService.adicionarMensagemSucesso('Caixa', 'Operação Realizada Com Sucesso');
      },(httpErrorResponse: HttpErrorResponse) => {
        this.mensagemService.adicionarMensagemErro('Caixas', httpErrorResponse?.error?.message);
      });
  }

  /**
   * Atualiza o caixa.
   */
   alterar() {
    this.caixaService.alterar(this.caixaBean)
    .toPromise().then(
      (caixaBean : CaixaBean) => {
        this.caixaBean = caixaBean;
        this.processarValoresDefault();

        this.acaoSistema.setaAcaoParaAlterar();
        this.mensagemService.adicionarMensagemSucesso('Caixa', 'Operação Realizada Com Sucesso');
      },(httpErrorResponse: HttpErrorResponse) => {
        this.mensagemService.adicionarMensagemErro('Caixas', httpErrorResponse?.error?.message);
      });
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
          this.processarValoresDefault();
        }, (httpErrorResponse: HttpErrorResponse) => {
          console.log(httpErrorResponse);
          this.mensagemService.adicionarMensagemErro('Caixa', httpErrorResponse?.error?.message);
        });
    }
  }

  processarValoresDefault() {
    if (this.caixaBean?.movimentacoes?.length > 0) {
      this.caixaBean.movimentacoes.forEach(function(item, index){
        item.indice = index;
      })
    }
    this.meses = []; 
    this.meses.push(this.caixaBean?.mes);
    this.calcularValores();
  }

  /**
   * Realiza o encerramento do caixa.
   * 
   * @param template 
   */
  finalizarCaixa() {
    this.mensagemService.dialogConfirm('Deseja realmente finalizar o caixa? Essa ação não poderá ser desfeita.')
          .then((result) => {
             if (result.isConfirmed) {
                this.caixaService.encerrar(this.caixaBean)
                                    .toPromise()
                                    .then(() => {
                                      this.mensagemService.adicionarMensagemSucesso('Caixa', 'Operação Realizada Com Sucesso.')
                                      this.acaoSistema.setaAcaoParaListar();
                                      this.caixaBean = {};
                                    }, (httpErrorResponse: HttpErrorResponse) => {
                                      console.log(httpErrorResponse);
                                      this.mensagemService.adicionarMensagemErro('Caixa', httpErrorResponse?.error?.message);
                                    });           
             }
          });
  }
}