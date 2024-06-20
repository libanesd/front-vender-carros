import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Venda } from '../model/venda.model';
import { CompraUser } from '../model/compraUser.model';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { VendaResponse } from '../model/vendaResponse.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
  })
export class VendaService {
    private baseUrl = 'http://localhost:8080/vendas';
    private comprasUsuario = 'compras_usuario';

    constructor(private httpClient: HttpClient,
      private authService : AuthService,
      private router: Router,
      private localStorageService: LocalStorageService, 
      private jwtHelper: JwtHelperService) {  }
  
    findAll(): Observable<Venda[]> {
      return this.httpClient.get<Venda[]>(this.baseUrl);
    }
  
    findById(id: String): Observable<Venda> {
      return this.httpClient.get<Venda>(`${this.baseUrl}/${id}`);
    }
  
    findByNome(nome: string): Observable<any>{
      return this.httpClient.get<Venda[]>(`${this.baseUrl}/search/nome/${nome}`);
    }
    insert(venda: Venda): Observable<Venda> {
      console.log(venda)
      return this.httpClient.post<Venda>(`${this.baseUrl}/venda-add`, venda);
    }

    getComprasUsuario(): VendaResponse | null {
      return this.localStorageService.getItem(this.comprasUsuario);
    }

    setComprasUsuario(token: VendaResponse): void {
      this.localStorageService.setItem(this.comprasUsuario, token);
    }

    insertCompraUser(venda: CompraUser): Observable<any> {
      let loginAux;
      this.authService.getUsuarioLogado().forEach((usuario)=>{
        loginAux = usuario?.login;
      })
      const params = {
        carro: venda.carro,
        login: loginAux,
      }
      console.log(params)
      return this.httpClient.post<any>(`${this.baseUrl}/compra-user`, params);
    }
    
    update(venda:Venda): Observable<Venda> {
      return this.httpClient.put<Venda>(`${this.baseUrl}/${venda.id}`, venda);
    }
  
    delete(venda: Venda): Observable<any> {
      return this.httpClient.delete<any>(`${this.baseUrl}/${venda.id}`);
    }
}