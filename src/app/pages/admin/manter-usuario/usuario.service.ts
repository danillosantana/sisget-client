import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioTO } from 'src/app/model/dto/usuario.to';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  API = environment.apiUrl;

  constructor(public http: HttpClient) { }

  getUsuarios() : Observable<Array<UsuarioTO>>  {
    return this.http.get<Array<UsuarioTO>>(this.API+'usuario/todos');
  }
}
