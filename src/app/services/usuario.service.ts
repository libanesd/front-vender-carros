import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario.model';
import { UsuarioLogado } from '../model/usuarioLogado';

@Injectable({
    providedIn: 'root'
  })
export class UsuarioService {
    private baseUrl = 'http://localhost:8080/usuarios';

    constructor(private httpClient: HttpClient) {  }
  
    findAll(): Observable<Usuario[]> {
      return this.httpClient.get<Usuario[]>(this.baseUrl);
    }
  
    findById(id: string): Observable<Usuario> {
      return this.httpClient.get<Usuario>(`${this.baseUrl}/${id}`);
    }
  
    insert(usuario: Usuario): Observable<Usuario> {
      return this.httpClient.post<Usuario>(this.baseUrl, usuario);
    }

    insertUser(usuario: Usuario): Observable<Usuario> {
      const data = {
        cpf: usuario.cpf,
        nome: usuario.nome,
        login: usuario.login,
        endereco:usuario.endereco,
        telefone:usuario.telefone,
        email: usuario.email,
        senha: usuario.senha
      }
      return this.httpClient.post<Usuario>(`http://localhost:8080/usuarios/cadastro`, data);
    }
    
    update(usuario:UsuarioLogado): Observable<Usuario> {
      return this.httpClient.put<Usuario>(`${this.baseUrl}/${usuario.id}`, usuario);
    }
  
    delete(usuario: Usuario): Observable<any> {
      return this.httpClient.delete<any>(`${this.baseUrl}/${usuario.id}`);
    }
}