import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario.model';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
    private baseUrl = 'http://localhost:8080/auth';

    constructor(private httpClient: HttpClient) {  }

    login(usuario: Usuario): Observable<Usuario> {
      const data = {
        login: usuario.login,
        senha: usuario.senha
      }
      return this.httpClient.post<Usuario>(`http://localhost:8080/auth`, data);
    }

}