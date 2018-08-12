import { Injectable } from '@angular/core';
import { HttpService } from '../servicos/http-service.service';
import { API } from '../classes/util/app-config'


@Injectable({
  providedIn: 'root'
})

/**
* Classe que fornece os serviços necessários para manipulação das informações do conta.
*/
export class ContaService {

  constructor(private http : HttpService) { }

  /**
	 * Retorna a lista de registroTO cadastrados.
	 */
	getContasTO() { 
		return this.http.get(API+'conta/getContasTO');
  }
  
  /**
	 * Retorna a lista de tipoPessoa. 
	 */
	getTiposPessoa() { 
		return this.http.get(API+'conta/getTiposPessoa');
  }
  
  /**
	 * Retorna o tipoConta;
	 */
	getTiposConta() {
		return this.http.get(API+'conta/getTiposConta');
	}
	
	/**
	 * Retorna a lista de tipoSituacao.
	 */
	getTiposSituacoes() {
		return this.http.get(API+'conta/getTiposSituacoes');
  }
  
  /**
   * Salva o registro.
   * 
   * @param conta 
   */
  salvar(conta) {
    return this.http.post(API+'conta/salvar', conta);
	}
	
	/**
	 * Ativa a conta.
	 * 
	 * @param idConta
	 */
	ativar(idConta) {
		return this.http.get(API+'conta/ativar/'+idConta);
	}
	
	/**
	 * Inativa a conta.
	 * 
	 * @param idConta
	 */
	inativar(idConta)  {
		return this.http.get(API+'conta/inativar/'+idConta);
	}

	/**
	 * Retorna a pessoa associado ao número de registro informado.
	 * 
	 * @param numeroRegistro
	 */
    getPessoaPorNumeroRegistro(numeroRegistro) {
		return this.http.get(API+'conta/getPessoaPorNumeroRegistro/'+numeroRegistro);
	}
}