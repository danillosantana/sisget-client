import { Injectable } from '@angular/core';
import { CaixaTO } from '../../model/dto/caixa.to';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../../servicos/http-service.service';
import { MesTO } from '../../model/dto/mes.to';
import { CaixaBean } from '../../model/bean/caixa-bean';
import { TipoOperacaoTO } from '../../model/dto/tipo-operacao.to';
import { TipoMovimentacaoTO } from '../../model/dto/tipo-movimentacao.to';
import { MovimentacaoBean } from './movimentacao-caixa/movimentacao-caixa-form-builder';
import { MensagemService } from 'src/app/servicos/mensagem.service';
import { environment } from './../../../environments/environment';
import { ArquivoTO } from 'src/app/model/dto/arquivo.to';

@Injectable({
  providedIn: 'root'
})
export class CaixaService {
  
  API = environment.apiUrl;

  constructor(public http: HttpClient, public httpService : HttpService, 
		      public mensagemService : MensagemService) { }

  /**
   *  Retorna a lista de caixas por ano vigente.
   */
  getCaixasTO() : Observable<Array<CaixaTO>>  {
    return this.http.get<Array<CaixaTO>>(this.API+'caixa/lista');
  }

  /**
   *  Salva as informações do Caixa.
   *  
   * @param caixa
   */	
  salvar(caixa) : Observable<CaixaBean> {
     return this.http.post<CaixaBean>(this.API+'caixa/salvar', caixa);		
  }

  /**
   *  Salva as informações do Caixa.
   *  
   * @param caixa
   */	
  alterar(caixa : CaixaBean) : Observable<CaixaBean>{
	return this.http.put<CaixaBean>(this.API+'caixa/alterar', caixa);		
  }
	
   /**
	* Retorna a lista de CaixaTO associado ao filtro informado.
	* 
	* @param filtro
	*/
	getCaixasTOPorFiltro(filtro) :  Observable<Array<CaixaTO>> {  
	   return this.http.post<Array<CaixaTO>>(this.API+'caixa/filtro', filtro);	
	}
	
   /**
	* Retorna o CaixaBean associado ao id informado.
	* 
	* @param idCaixa
	*/
	getCaixaBean(idCaixa) :  Observable<CaixaBean> { 
	   return this.http.get<CaixaBean>(this.API+'caixa/'+idCaixa);
	}
	
   /**
	* Retorna a lista de TipoMovimentacao.
	*/
	getTiposMovimentacoes() : Observable<Array<TipoMovimentacaoTO>> {
	   return this.http.get<Array<TipoMovimentacaoTO>>(this.API+'caixa/tipos/movimentacoes');		
	}
	
   /**
	* Retorna a lista de TipoOperacao.
	*/
	getTiposOperacaoes() :  Observable<Array<TipoOperacaoTO>> {
	   return this.http.get<Array<TipoOperacaoTO>>(this.API+'caixa/tiposOperacaoes');
	}

	/**
	 * Retorna a lista de meses disponíveis para cadastro.
	 * 
	 * @param ano
	 */
	getMesesDisponiveis(ano) :  Observable<any>  { 
		return this.http.get<any>(this.API+'caixa/meses/disponiveis/'+ano);		
	}

	/**
	 * Verifica que os campos obrigatórios do mvimentacaoCaixa foram informados.
	 * 
	 * @param movimentacaoCaixa
	 */
	validarCamposObrigatoriosMovimentoCaixa(movimentacaoCaixa : MovimentacaoBean) : Observable<any> { 
		return this.http.post<MovimentacaoBean>(this.API+'caixa/validar/campos-obrigatorios-movimentoCaixa', movimentacaoCaixa);
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
   encerrar(caixa : CaixaBean) :  Observable<any> {
	  return this.http.put(this.API+`caixa/encerrar/`, caixa);		
   }

     /**
	 * Verifica que existe algum caixa que está com a situação vigente aberta.
	 * 
	 * @param ano
	 */
	validarCaixaEmAberto() {
		return this.http.get(this.API+'caixa/validar/caixa-em-aberto/');
	}

  /**
	 * Retorna um novo caixa.
	 * 
	 */
	getNovoCaixa() : Observable<CaixaBean> { 
		return this.http.get<CaixaBean>(this.API+'caixa/novo-caixa');
	}

	/**
	 * Retorna a lista de meses.
	 * 
	 */
	getMeses() :  Observable<Array<MesTO>> {
		return this.http.get<Array<MesTO>>(this.API+'caixa/meses');
	}
	
}