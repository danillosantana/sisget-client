import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { PoupService } from '../../servicos/poup.service';
import {CaixaService} from '../../caixa/caixa.service';
import { MensagensService } from '../../mensagens/mensagens.service';

@Component({
  selector: 'app-fechamento-caixa',
  templateUrl: './fechamento-caixa.component.html',
  styleUrls: ['./fechamento-caixa.component.css']
})
export class FechamentoCaixaComponent implements OnInit {

  @Input()	caixa:	any;
  @Output() encerramentoRealizado : EventEmitter<any> = new EventEmitter<any>();

  constructor(private poupService : PoupService, private caixaService : CaixaService, private mensagemService : MensagensService) { }

  ngOnInit() {
  }

  /**
   * Finaliza o caixa.
   * 
   */
  finalizar() {
    this.caixaService.encerrar(this.caixa).subscribe(
      data => {
        // this.mensagemService.addMensagemSucesso(data);
        this.poupService.hide();
        this.caixa = {};
        this.encerramentoRealizado.emit(true);
      },
      err => {
        // this.mensagemService.addMensagemErro(err.error);
      }
    ); 
  }

  /**
   * Cancela a ação de encerramento do caixa.
   */
  cancelar() {
    this.caixa = {};
    this.poupService.hide();
  }
}
