import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioLogado } from '../model/usuarioLogado';
import axios, { AxiosInstance } from 'axios';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

  private axiosClient: AxiosInstance;
  private baseURL: string = 'http://localhost:8080/auth';
  private tokenKey = 'jwt_token';
  private usuarioLogadoKey = 'usuario_logado';
  private usuarioLogadoSubject = new BehaviorSubject<UsuarioLogado | null>(null);

  constructor(private http: HttpClient, 
              private router: Router,
              private localStorageService: LocalStorageService, 
              private jwtHelper: JwtHelperService) {

                this.axiosClient = axios.create({
                  baseURL: 'http://localhost:8080',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });

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
  async validarCodigo(codigo: string,senha: string,repetirSenha: string): Promise<any> {
    const validarCodigo = {
      codigo: codigo,
      senha: senha,
      repetirSenha: repetirSenha,
    };
    const response = await
    this.axiosClient({
      method: 'post',
      url: '/auth/validar-codigo',
      data: validarCodigo
    })
    .then(response => {
      console.log("senha trocada com sucesso!!");
      this.router.navigateByUrl('/teste');
      return response;
    })
    .catch(error => {
      alert("Deu Erro!!!");
      console.error(error);
    }).finally(() => {
      // redirecionar e remover o load
      console.log("Redirecionado com sucesso!!")
    });
    console.log(response);
    return response;
  }
  async gerarCodigo(email: string):Promise<any> {
    console.log("iniciando");
    // iniciar load 
    const response = await 
    this.axiosClient({
      method: 'post',
      url: '/auth/gerar-codigo',
      data: email
    })
    .then(response => {
      console.log("email enviado com sucesso!!");
      this.router.navigateByUrl('/trocar-de-senha');
      return response;
    })
    .catch(error => {
      alert("Deu Erro!!!");
      console.error(error);
    }).finally(() => {
      // redirecionar e remover o load
      console.log("Redirecionado com sucesso!!")
    });
    console.log(response);
    return response; 
  }
  async loginDois(email: string, senha: string): Promise<any> {
    const params = {
      login: email,
      senha: senha
    }
    const response = await 
    this.axiosClient({
      method: 'post',
      url: '/auth',
      data: params
    })
    .then(response => {
      console.log("Login realizado com sucesso!!");
      this.router.navigateByUrl('/home');
      return response;
    })
    .catch(error => {
      alert("Deu Erro!!!");
      console.error(error);
    }).finally(() => {
      // redirecionar e remover o load
      console.log("Redirecionado com sucesso!!")
    });
    console.log(response);
    return response;
  }  
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