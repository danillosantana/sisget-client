import { Component, OnInit, Output, EventEmitter, TemplateRef  } from '@angular/core';
import { CaixaService } from '../../caixa/caixa.service';
import { MensagensService } from '../../mensagens/mensagens.service';
import { PoupService } from '../../servicos/poup.service';
import {DataTableService} from '../../servicos/data-table.service';

@Component({
  selector: 'app-lista-caixa',
  templateUrl: './lista-caixa.component.html',
  styleUrls: ['./lista-caixa.component.css']
})

/**
 * Componente responsável pela manipulação lista de caixa.
 * 
 * @author Danillo Santana	
 */
export class ListaCaixaComponent implements OnInit {

  caixasTO : any = [];
  filtro   : any = {};
  meses    : any = [];
  @Output() enviarCaixaParaVisualizacao = new EventEmitter();
  @Output() enviarCaixaParaAlteracao = new EventEmitter();
  @Output() novoCaixaEmitter = new EventEmitter();

  constructor(protected caixaService : CaixaService, private mensagemService : MensagensService, 
            private poupService : PoupService, public dataTableService : DataTableService) { 

  }

  openModal(template: TemplateRef<any>) {
    this.poupService.show(template);
  }

  closeModal(template : TemplateRef<any>) {
    this.poupService.hide();
  }

  ngOnInit() {
    this.inicialiarMeses();
    this.inicializarCaixas();
  }

  /**
  * Inicializa a lista de caixas;
  */
  inicializarCaixas() {
    this.caixaService.getCaixasTOsPorAnoVigente()
    .subscribe(
      data => {
        this.caixasTO = data;
        this.dataTableService.setarDataTable(this.caixasTO);
      },
      err => {
        this.mensagemService.addMensagemErro(err.error);
      }
    );
  }

  /**
  * Envia os dados do caixa para que sejam visualizados.
  */
 visualizar(caixaTO) {
    this.enviarCaixaParaVisualizacao.emit(caixaTO);
  }

  /**
  * Envia os dados do caixa para que sejam atualizados.
  */
  alterar(caixaTO) {
    this.enviarCaixaParaAlteracao.emit(caixaTO);
  }

  novoCaixa() {
    this.novoCaixaEmitter.emit("");
  }

    /**
	 * Retorna o relatório caixa.
	 * 
	 * @param idCaixa
	 */
	getRelatorioCaixa(idCaixa) {
      this.caixaService.getRelatorioCaixa(idCaixa);
  }
  
  /**
   * Realiza a pesquisa de caixas.
   */
  pesquisar() {
    if (this.filtro.mes == 0) {
      this.filtro.mes = undefined;
    }
    this.caixaService.getCaixasTOPorFiltro(this.filtro)
    .subscribe(
      data => {
        this.caixasTO = data;
        this.filtro.mes == undefined ? this.setarMesDefault() : this.filtro.mes;
        this.dataTableService.setarDataTable(this.caixasTO);
      },
      err => {
        this.setarMesDefault();
        this.mensagemService.addMensagemErro(err.error);
      }
    );
  }

  setarMesDefault() {
    this.filtro.mes = 0;
  }

  /**
   * Inicializa a lista de meses
   */
  inicialiarMeses() {
    this.caixaService.getMeses().subscribe(
      data => {
        this.meses = data;
        this.setarMesDefault();
      },
      err => {this.mensagemService.addMensagemErro(err.error);}
    );
  }

  /**
   *Reseta o formulário.
   */
  limpar() {
    this.filtro = {};
    this.filtro.mes = 0;
    this.caixasTO = [];
    this.dataTableService.setarDataTable([]);
  }
}
