import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from '../servicos/http-service.service';
import { API } from '../classes/util/app-config'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/**
* Classe que fornece os serviços necessários para manipulação das informações do caixa.
*/
export class CaixaService {
  

  constructor(private http : HttpService) { }

  /**
   *  Retorna a lista de caixas por ano vigente.
   */
  getCaixasTOsPorAnoVigente() {
    return this.http.get(API+'caixa/getCaixasTOsPorAnoVigente');
  }

  /**
   *  Salva as informações do Caixa.
   *  
   * @param caixa
   */	
  salvar(caixa) {
     return this.http.post(API+'caixa/salvar', caixa);		
  }

  /**
   *  Salva as informações do Caixa.
   *  
   * @param caixa
   */	
  alterar(caixa) {
	return this.http.post(API+'caixa/alterar', caixa);		
  }
	
   /**
	* Retorna a lista de CaixaTO associado ao filtro informado.
	* 
	* @param filtro
	*/
	getCaixasTOPorFiltro(filtro) {  
	   return this.http.post(API+'caixa/getCaixasTOPorFiltro', filtro);	
	}
	
   /**
	* Retorna o CaixaBean associado ao id informado.
	* 
	* @param idCaixa
	*/
	getCaixaBean(idCaixa) { 
	   return this.http.get(API+'caixa/getCaixaBean/'+idCaixa);
	}
	
   /**
	* Retorna a lista de TipoMovimentacao.
	*/
	getTiposMovimentacoes() {
	   return this.http.get(API+'caixa/getTiposMovimentacoes');		
	}
	
   /**
	* Retorna a lista de TipoOperacao.
	*/
	getTiposOperacaoes() {
	   return this.http.get(API+'caixa/getTiposOperacaoes');
	}

	/**
	 * Retorna a lista de meses disponíveis para cadastro.
	 * 
	 * @param ano
	 */
	getMesesDisponiveis(ano) { 
		return this.http.get(API+'caixa/getMesesDisponiveis/'+ano);		
	}

	/**
	 * Verifica que os campos obrigatórios do mvimentacaoCaixa foram informados.
	 * 
	 * @param movimentacaoCaixa
	 */
	validarCamposObrigatoriosMovimentoCaixa(movimentacaoCaixa) { 
		return this.http.post(API+'caixa/validarCamposObrigatoriosMovimentoCaixa', movimentacaoCaixa);
	}

	/**
	 * Verifica que o tipo de operação e 'Entrada'
	 * 
	 * @param tipoOperacao 
	 */
    isOperacaoEntrada(tipoOperacao) {
       return tipoOperacao != undefined && tipoOperacao.id == 1;
	}
	
	/**
   *  Salva as informações do Caixa.
   *  
   * @param caixa
   */	
   encerrar(caixa) {
	  return this.http.post(API+'caixa/encerrar', caixa);		
   }

     /**
	 * Verifica que existe algum caixa que está com a situação vigente aberta.
	 * 
	 * @param ano
	 */
	validarCaixaEmAberto(ano) {
		return this.http.get(API+'caixa/validarCaixaEmAberto/'+ano);
	}

	//TODO colocar em diretiva
   /**
   * Retorna a classe do css para o saldo final
   */
  getClasseSaldos(valor) {
    return valor >= 0 ? 'text-green' : 'text-red';
  }

  /**
	 * Retorna um novo caixa.
	 * 
	 */
	getNovoCaixa() { 
		return this.http.get(API+'caixa/getNovoCaixa');
	}

	/**
	 * Retorna o relatório caixa.
	 * 
	 * @param idCaixa
	 */
	getRelatorioCaixa(idCaixa) {
		this.http.downloadFile(API+'arquivo/getRelatorioCaixa/'+idCaixa);
	}
}