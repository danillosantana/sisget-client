import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {CaixaService} from '../caixa.service';

@Component({
  selector: 'app-fechamento-caixa',
  templateUrl: './fechamento-caixa.component.html',
  styleUrls: ['./fechamento-caixa.component.css']
})
export class FechamentoCaixaComponent implements OnInit {

  @Input()	caixa:	any;
  @Output() encerramentoRealizado : EventEmitter<any> = new EventEmitter<any>();

  constructor(public caixaService : CaixaService) { }

  ngOnInit() {
  }

  /**
   * Finaliza o caixa.
   * 
   */
  finalizar() {
    this.caixaService.encerrar(this.caixa).subscribe(
      data => {
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
  }
}
