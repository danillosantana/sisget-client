import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissoesTO } from 'src/app/model/dto/permissoes.to';
import { UsuarioTO } from 'src/app/model/dto/usuario.to';
import { environment } from 'src/environments/environment';
import { UsuarioSenhaBean } from './alterar-senha-usuario/usuario-senha.form-builder.service';
import { UsuarioBean } from './usuario/usuario-form-builder.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  API = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getUsuarios() : Observable<Array<UsuarioTO>>  {
    return this.http.get<Array<UsuarioTO>>(this.API+'usuario/todos');
  }

  getPermissoes() {
    return this.http.get<Array<PermissoesTO>>(this.API+'usuario/permissoes');
  }

  deletar(id : number) {
    return this.http.delete<Array<PermissoesTO>>(this.API+`usuario/${id}`);
  }

  getUsuarioPorId(id : number) {
    return this.http.get<UsuarioBean>(this.API+`usuario/${id}`);
  }

  salvar(usuario : UsuarioBean) {
    return this.http.put<any>(this.API+`usuario/salvar`, usuario);
  }
  
  alterar(usuario : UsuarioBean) {
    return this.http.put<any>(this.API+`usuario/alterar`, usuario);
  }

  alterarSenha(usuarioSenhaBean : UsuarioSenhaBean) {
    return this.http.put<any>(this.API+`usuario/alterar-senha`, usuarioSenhaBean);
  }
}
