import { Injectable } from '@angular/core';
import { API } from '../classes/util/app-config'
import { CaixaTO } from '../model/dto/caixa.to';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../servicos/http-service.service';
import { MesTO } from '../model/dto/mes.to';


@Injectable({
  providedIn: 'root'
})
export class CaixaService {
  

  constructor(public http: HttpClient, public httpService : HttpService) { }

  /**
   *  Retorna a lista de caixas por ano vigente.
   */
  getCaixasTOsPorAnoVigente() : Observable<Array<CaixaTO>>  {
    return this.http.get<Array<CaixaTO>>(API+'caixa/ano-vigente');
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
	getCaixasTOPorFiltro(filtro) :  Observable<Array<CaixaTO>> {  
	   return this.http.post<Array<CaixaTO>>(API+'caixa/filtro', filtro);	
	}
	
   /**
	* Retorna o CaixaBean associado ao id informado.
	* 
	* @param idCaixa
	*/
	getCaixaBean(idCaixa) { 
	   return this.http.get(API+'caixa/'+idCaixa);
	}
	
   /**
	* Retorna a lista de TipoMovimentacao.
	*/
	getTiposMovimentacoes() {
	   return this.http.get(API+'caixa/tipos/movimentacoes');		
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
	getMesesDisponiveis(ano) :  Observable<any>  { 
		return this.http.get<any>(API+'caixa/meses/disponiveis/'+ano);		
	}

	/**
	 * Verifica que os campos obrigatórios do mvimentacaoCaixa foram informados.
	 * 
	 * @param movimentacaoCaixa
	 */
	validarCamposObrigatoriosMovimentoCaixa(movimentacaoCaixa) { 
		return this.http.post(API+'caixa/validar/campos-obrigatorios-movimentoCaixa', movimentacaoCaixa);
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
		return this.http.get(API+'caixa/validar/caixa-em-aberto/'+ano);
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
		return this.http.get(API+'caixa/novo-Caixa');
	}

	/**
	 * Retorna o relatório caixa.
	 * 
	 * @param idCaixa
	 */
	getRelatorioCaixa(idCaixa) {
		this.httpService.downloadFile(API+'arquivo/getRelatorioCaixa/'+idCaixa);
	}

	/**
	 * Retorna a lista de meses.
	 * 
	 */
	getMeses() :  Observable<Array<MesTO>> {
		return this.http.get<Array<MesTO>>(API+'caixa/meses');
	}
}