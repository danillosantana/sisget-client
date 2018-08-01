import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
* Classe que fornece os serviços necessários para manipulação 
* das mensagens do sistema.
*/
export class MensagensService {

  static enviarMensagemSucesso = new EventEmitter<string>();
  static enviarMensagemErro = new EventEmitter<string>();

  constructor() { }

  /**
  * Adiciona a mensagem de sucesso no componente de mensagens
  */
  addMensagemSucesso(mensagem) {
    MensagensService.enviarMensagemSucesso.emit(mensagem);
  }

  /**
  * Adiciona a mensagem de erro no componente de mensagens
  */
  addMensagemErro(mensagem) {
  	MensagensService.enviarMensagemErro.emit(mensagem);
  }
}