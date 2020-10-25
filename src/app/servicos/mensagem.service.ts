import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
  })
export class MensagemService {

    adicionarMensagemSucesso(titulo :string, mensagem : string) {
        Swal.fire({
            icon: 'success',
            title: titulo,
            text: mensagem
          });
    }

    adicionarMensagemErro(titulo : string, mensagem :string) {
        Swal.fire({
            icon: 'error',
            title: titulo,
            text: mensagem
          });
    }

}