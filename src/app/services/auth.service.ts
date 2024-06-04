import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioLogado } from '../model/usuarioLogado';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

  private baseURL: string = 'http://localhost:8080/auth';
  private tokenKey = 'jwt_token';
  private usuarioLogadoKey = 'usuario_logado';
  private usuarioLogadoSubject = new BehaviorSubject<UsuarioLogado | null>(null);

  constructor(private http: HttpClient, 
              private localStorageService: LocalStorageService, 
              private jwtHelper: JwtHelperService) {

    this.initUsuarioLogado();

  }
  private initUsuarioLogado() {
    const usuario = localStorage.getItem(this.usuarioLogadoKey);
    console.log(usuario);
    if (usuario) {
      const usuarioLogado = JSON.parse(usuario);

      this.setUsuarioLogado(usuarioLogado);
      this.usuarioLogadoSubject.next(usuarioLogado);
    }
  }
  setUsuarioLogado(usuario: UsuarioLogado): void {
    this.localStorageService.setItem(this.usuarioLogadoKey, usuario);
  }
  validarCodigo(codigo: string): Observable<any> {
    return this.http.post(`http://localhost:8080/auth/validar-codigo`, codigo, {observe: 'response'}).pipe(
      tap((res: any) => {
        const authToken = res.headers.get('Authorization') ?? 'nada';
        console.log(authToken);
        if (authToken) {
          this.setToken(authToken);
          const usuarioLogado = res.body;
          console.log(usuarioLogado);
          if (usuarioLogado) {
            this.setUsuarioLogado(usuarioLogado);
            this.usuarioLogadoSubject.next(usuarioLogado);
          }
        }else{
          console.log('não tem login');
        }
      })
    );
  }
  gerarCodigo(email: string):void {
    this.http.post<String>(`http://localhost:8080/auth/gerar-codigo`, email);
  }
  loginDois(email: string, senha: string): Observable<any> {
    const params = {
      login: email,
      senha: senha,
      perfil: 1 // paciente 
    }

    //{ observe: 'response' } para garantir que a resposta completa seja retornada (incluindo o cabeçalho)
    return this.http.post(`${this.baseURL}`, params, {observe: 'response'}).pipe(
      tap((res: any) => {
        const authToken = res.headers.get('Authorization') ?? 'nada';
        console.log(authToken);
        if (authToken) {
          this.setToken(authToken);
          const usuarioLogado = res.body;
          console.log(usuarioLogado);
          if (usuarioLogado) {
            this.setUsuarioLogado(usuarioLogado);
            this.usuarioLogadoSubject.next(usuarioLogado);
          }
        }else{
          console.log('não tem login');
        }
      })
    );
  }  
    // login(usuario: UsuarioLogado): Observable<Usuario> {
    //   const data = {
    //     login: usuario.login,
    //     senha: usuario.senha
    //   }
    //   return this.http.post<Usuario>(`http://localhost:8080/auth`, data);
    // }

    setToken(token: string): void {
      this.localStorageService.setItem(this.tokenKey, token);
    }
  
    
    getUsuarioLogado() {
      return this.usuarioLogadoSubject.asObservable();
    }
  
    getToken(): string | null {
      return this.localStorageService.getItem(this.tokenKey);
    }
  
    removeToken(): void {
      this.localStorageService.removeItem(this.tokenKey);
    }
  
    removeUsuarioLogado(): void {
      this.localStorageService.removeItem(this.usuarioLogadoKey);
      this.usuarioLogadoSubject.next(null);
    }
  
    isTokenExpired(): boolean {
      const token = this.getToken();
      // Verifica se o token é nulo ou está expirado
      return !token || this.jwtHelper.isTokenExpired(token);
      // npm install @auth0/angular-jwt
    }
  

}