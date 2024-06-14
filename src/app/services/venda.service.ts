import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venda } from '../model/venda.model';

@Injectable({
    providedIn: 'root'
  })
export class VendaService {
    private baseUrl = 'http://localhost:8080/vendas';

    constructor(private httpClient: HttpClient) {  }
  
    findAll(): Observable<Venda[]> {
      return this.httpClient.get<Venda[]>(this.baseUrl);
    }
  
    findById(id: string): Observable<Venda> {
      return this.httpClient.get<Venda>(`${this.baseUrl}/${id}`);
    }
  
    insert(venda: Venda): Observable<Venda> {
      console.log(venda)
      return this.httpClient.post<Venda>(`${this.baseUrl}/venda-add`, venda);
    }
    
    update(venda:Venda): Observable<Venda> {
      return this.httpClient.put<Venda>(`${this.baseUrl}/${venda.id}`, venda);
    }
  
    delete(venda: Venda): Observable<any> {
      return this.httpClient.delete<any>(`${this.baseUrl}/${venda.id}`);
    }
}