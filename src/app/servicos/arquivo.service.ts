import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ComprovanteMovimentacaoTO } from "../model/dto/comprovante-movimentacao.to";
import { HttpService } from "./http-service.service";
import { MensagemService } from "./mensagem.service";

@Injectable({
    providedIn: 'root'
  })
export class ArquivoService {

    API = environment.apiUrl;

    constructor(public http: HttpClient, public httpService : HttpService,
                public mensagemService : MensagemService) { }

    	/**
	 * Retorna o relatório caixa.
	 * 
	 * @param idCaixa
	 */
	getRelatorioCaixa(idCaixa) {
        return	this.http.get(this.API+'arquivo/relatorio/caixa/'+idCaixa, { responseType: 'blob' }).subscribe(
                data => {
                  var file = new Blob([data], {type: 'application/pdf'});
                  var fileURL = URL.createObjectURL(file);
                  window.open(fileURL);
                }, (httpErrorResponse: HttpErrorResponse) => {
                    this.mensagemService.adicionarMensagemErro('Caixas', httpErrorResponse?.error?.message);
                  });
        }
  

    uploadComprovante(file : File) : Observable<ComprovanteMovimentacaoTO> { 
		let headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
		let options = { headers: headers };
		
		let formData = new FormData();
		formData.append('file', file, file.name);
		
		return this.http.post<ComprovanteMovimentacaoTO>(this.API+'arquivo/comprovante/upload', formData, options);
    }
    
    deletarComprovante(id : number) {
        return this.http.delete<any>(this.API+`arquivo/comprovante/${id}`);
    }

    downloadComprovante(id : number) {
      return this.http.get(this.API+`arquivo/comprovante/download/${id}`, { responseType: 'blob' });
    }
}