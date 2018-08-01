import { Component, OnInit, Output, EventEmitter, TemplateRef, ElementRef, ViewChild  } from '@angular/core';

import { CaixaService } from '../../caixa/caixa.service';
import { MensagensService } from '../../mensagens/mensagens.service';
import { PoupService } from '../../servicos/poup.service';

@Component({
  selector: 'app-lista-caixa',
  templateUrl: './lista-caixa.component.html',
  styleUrls: ['./lista-caixa.component.css']
})

/**
 * Componente responsável pela manipulação das informações do caixa.
 * 
 * @author Danillo Santana	
 */
export class ListaCaixaComponent implements OnInit {

  caixasTO : any = [];
  @Output() enviarCaixaParaVisualizacao = new EventEmitter();
  @Output() enviarCaixaParaAlteracao = new EventEmitter();

  constructor(protected caixaService : CaixaService, private mensagemService : MensagensService, private poupService : PoupService) { 

  }

  openModal(template: TemplateRef<any>) {
    this.poupService.show(template);
  }

  closeModal(template : TemplateRef<any>) {
    this.poupService.hide();
  }

  ngOnInit() {
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

    /**
	 * Retorna o relatório caixa.
	 * 
	 * @param idCaixa
	 */
	getRelatorioCaixa(idCaixa) {
      this.caixaService.getRelatorioCaixa(idCaixa);
	}
}
