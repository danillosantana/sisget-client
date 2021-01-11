import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ArquivoTO } from "../model/dto/arquivo.to";
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
                  });;
        }
  

    upload(file : File) : Observable<ArquivoTO> { 
		let headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
		let options = { headers: headers };
		
		let formData = new FormData();
		formData.append('file', file, file.name);
		
		return this.http.post<ArquivoTO>(this.API+'arquivo/upload', formData, options);
    }
    
    deletar(id : number) {
        return this.http.delete<any>(this.API+`arquivo/${id}`);
    }
}