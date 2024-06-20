import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioLogado } from '../model/usuarioLogado';
import axios, { AxiosInstance } from 'axios';
import { Router } from '@angular/router';
import { UsuarioDadosPessoais } from '../model/usuarioDadosPessoais.model';
import { UsuarioDadosBasicos } from '../model/usuarioDadosBasicos.model';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

  private axiosClient: AxiosInstance;
  private baseURL: string = 'http://localhost:8080/auth';
  private tokenKey = 'jwt_token';
  private usuarioLogadoKey = 'usuario_logado';
  private usuarioDadosPessoaisKey = 'usuario_dados_pessoais';
  private usuarioLogadoSubject = new BehaviorSubject<UsuarioLogado | null>(null);
  private usuarioDadosPessoaisSubject = new BehaviorSubject<UsuarioDadosPessoais | null>(null);

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
    this.initUsuarioDadosPessoais();
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
  private initUsuarioDadosPessoais() {
    const usuario = localStorage.getItem(this.usuarioDadosPessoaisKey);
    console.log(usuario);
    if (usuario) {
      const usuarioLogado = JSON.parse(usuario);

      this.setUsuarioDadosPessoais(usuarioLogado);
      this.usuarioDadosPessoaisSubject.next(usuarioLogado);
    }
  }
  setUsuarioLogado(usuario: UsuarioLogado): void {
    this.localStorageService.setItem(this.usuarioLogadoKey, usuario);
  }
  setUsuarioDadosPessoais(usuario: UsuarioDadosPessoais): void {
    this.localStorageService.setItem('usuario_dados_Pessoais', usuario);
    this.usuarioDadosPessoaisSubject.next(usuario);
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
      maxBodyLength: Infinity,
      url: '/auth',
      data: params
    })
    .then((response:any) => {
      console.log(JSON.stringify(response.headers));
      console.log("Login realizado com sucesso!!");
      console.log(response);
      const authToken = response.headers.get('Authorization') ?? '';
      console.log(response.headers);
        if (authToken) {
          this.setToken(authToken);
          const usuarioLogado = response.body;
          console.log(usuarioLogado);
          if (usuarioLogado) {
            this.setUsuarioLogado(usuarioLogado);
            this.usuarioLogadoSubject.next(usuarioLogado);
      this.router.navigateByUrl('/home');
          }
        }
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
  
  loginTres(email: string, senha: string): Observable<any> {
    const params = {
      login: email,
      senha: senha,
    }

    //{ observe: 'response' } para garantir que a resposta completa seja retornada (incluindo o cabeçalho)
    return this.http.post(`${this.baseURL}`, params, {observe: 'response'}).pipe(
      tap((res: any) => {
        const authToken = res.headers.get('authorization');
        console.log("Depois de pegar a variavel auth");
        if (authToken) {
          this.setToken(authToken);
          const usuarioLogado = res.body;
          console.log("Depois de pegar a variavel usuario");
          if (usuarioLogado) {
            this.setUsuarioLogado(usuarioLogado);
            this.usuarioLogadoSubject.next(usuarioLogado);
            console.log("Depois de setar a variavel usuario");
          }
        }
      })
    );
  }

  setToken(token: string): void {
    this.localStorageService.setItem(this.tokenKey, token);
  }

  getUsuarioLogado() {
    return this.usuarioLogadoSubject.asObservable();
  }
  getUsuarioDadosPessoais() {
    return this.usuarioDadosPessoaisSubject.asObservable();
  }

  getToken(): string | null {
    return this.localStorageService.getItem(this.tokenKey);
  }

  removeToken(): void {
    this.localStorageService.removeItem(this.tokenKey);
  }

  removeUsuarioLogado(): void {
    this.localStorageService.removeItem(this.usuarioLogadoKey);
    this.localStorageService.removeItem(this.usuarioDadosPessoaisKey);
    this.usuarioLogadoSubject.next(null);
    this.usuarioLogadoSubject.next(null);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    console.error('token: ' + token);
    if (!token) {
      return true;
    }
    
    try {
      console.error('jwtHelper: ' + this.jwtHelper.isTokenExpired(token));
      return this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      console.error('Token inválido:', error);
      return true; 
    }
  }
  
  updateDadosBasicoUsuarioLogado(usuario:UsuarioDadosBasicos): Observable<any>{
    const params = {
      id: usuario.id,
      login: usuario.login,
      nome: usuario.nome,
      endereco: usuario.endereco,
      telefone: usuario.telefone
    }
    console.log("Update dados basicos"+params);
    return this.http.post(`${this.baseURL}/update-dados-basicos`, params, {observe: 'response'}).pipe(
      tap((res: any) => {
        console.log(res);
        const authToken = res.headers.get('authorization');
        console.log("Depois de pegar a variavel auth");
        this.removeToken()
        this.removeUsuarioLogado();
        if (authToken) {
          this.setToken(authToken);
          const usuarioLogado = res.body;
          console.log(usuarioLogado);
          console.log("Depois de pegar a variavel usuario");
          if (usuarioLogado) {
            this.setUsuarioLogado(usuarioLogado);
            this.usuarioLogadoSubject.next(usuarioLogado);
            console.log("Depois de setar a variavel usuario");
          }
        }
      })
    );
  }
  updateDadosPessoaisUsuarioLogado(usuario: UsuarioDadosPessoais): Observable<any>{
    const params = {
      id: usuario.id,
      login: usuario.login,
      email: usuario.email,
      cpf: usuario.cpf,
      senha: usuario.senha
    }
    console.log(params)
    //{ observe: 'response' } para garantir que a resposta completa seja retornada (incluindo o cabeçalho)
    return this.http.post(`${this.baseURL}/update-dados-pessoais`, params, {observe: 'response'}).pipe(
      tap((res: any) => {
        const authToken = res.headers.get('authorization');
        console.log("Depois de pegar a variavel auth");
        if (authToken) {
          this.setToken(authToken);
          const usuarioLogado = res.body;
          console.log("Depois de pegar a variavel usuario");
          this.removeToken()
          this.removeUsuarioLogado();
          if (usuarioLogado) {
            this.setUsuarioLogado(usuarioLogado);
            this.usuarioLogadoSubject.next(usuarioLogado);
            console.log("Depois de setar a variavel usuario");
          }
        }
      })
    );
  }

  verificarSenha(senha: String):Observable<any>{
    let loginAux;
    this.getUsuarioLogado().forEach((usuario)=>{
      loginAux = usuario?.login;
    })
    const param = {
      login: loginAux,
      senha:senha
    }
    console.log(param);
    return this.http.post(`${this.baseURL}/verificar-senha`, param, {observe: 'response'}).pipe(
      tap((res: any) => {
        if(res){
            const usuario = res.body;
            this.setUsuarioDadosPessoais(usuario);
        }
      })
    );
  }
}