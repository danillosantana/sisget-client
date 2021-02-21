import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpService } from "src/app/servicos/http-service.service";
import { MensagemService } from "src/app/servicos/mensagem.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
export class RelatorioCaixaService {

    API = environment.apiUrl;

    constructor(public http: HttpClient, public httpService : HttpService,
                public mensagemService : MensagemService) { }

    gerarRelatorioCaixa(idCaixa) {
        return	this.http.get(this.API+'relatorio-caixa/'+idCaixa, { responseType: 'blob' }).subscribe(
                data => {
                  var file = new Blob([data], {type: 'application/pdf'});
                  var fileURL = URL.createObjectURL(file);
                  window.open(fileURL);
                }, (httpErrorResponse: HttpErrorResponse) => {
                    this.mensagemService.adicionarMensagemErro('Caixas', httpErrorResponse?.message);
                  });
        }
  

}  