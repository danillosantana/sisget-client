import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioBean } from 'src/app/model/bean/usuario-bean';
import { UsuarioSenhaBean } from 'src/app/model/bean/usuario-senha-bean';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    API = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getTodos() {
    return this.http.get(this.API + 'usuario/todos');
  }

  getPerfis() {
    return this.http.get(this.API + 'usuario/perfis');
  }

  salvar(usuario : UsuarioBean) {
    return this.http.put(this.API + 'usuario/salvar', usuario);
  }

  alterar(usuario : UsuarioBean) {
    return this.http.put(this.API + 'usuario/alterar', usuario);
  }

  getUsuarioPorId(id : number) {
    return this.http.get(this.API + `usuario/${id}`);
  }

  excluir(id : number) {
    return this.http.delete(this.API + `usuario/${id}`);
  }

  alterarSenha(usuario : UsuarioSenhaBean) {
    return this.http.put(this.API + 'usuario/alterar-senha', usuario);
  }
}
