import { Component, OnInit } from '@angular/core';

import { MensagensService } from './mensagens.service';


@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css']
})

/**
* Componete responsável por exibir mensagens de sistema.
*/
export class MensagensComponent implements OnInit {

  mensagem : string;
  tipoMensagem : string;
  exibirMensagem : boolean = false;

  constructor(private mensagemService : MensagensService) { }

  ngOnInit() {
  	MensagensService.enviarMensagemSucesso.subscribe(mensagem => {
  		this.definirMensagem(mensagem, 'success');
  	});

  	MensagensService.enviarMensagemErro.subscribe(mensagem => {
  		this.definirMensagem(mensagem, 'danger');
  	});
  }

  /**
  * Define a mensagem a ser mostrada.
  */
  definirMensagem(mensagem, tipoMensagem) {
     this.mensagem = mensagem;
     this.tipoMensagem = tipoMensagem;
     this.exibirMensagem = true;
 
	 setTimeout(() => {
	    this.exibirMensagem = false;
	 }, 4000);
  }
}