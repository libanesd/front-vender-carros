import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../model/marca.model';
import { Carro } from '../model/carro.model';

@Injectable({
    providedIn: 'root'
  })
export class MarcaService {
    private baseUrl = 'http://localhost:8080/marcas';

    constructor(private httpClient: HttpClient) {  }
  
    findAll(): Observable<Marca[]> {
      return this.httpClient.get<Marca[]>(this.baseUrl);
    }
  
    findById(id: string): Observable<Marca> {
      return this.httpClient.get<Marca>(`${this.baseUrl}/${id}`);
    }
  
    insert(marca: Marca): Observable<Marca> {
      
      const data = {
        nome: marca.nome,
        carros: [Carro]
      };
      return this.httpClient.post<Marca>(`http://localhost:8080/marcas/insert`, data);
    }
    
    update(marca:Marca): Observable<Marca> {
      return this.httpClient.put<Marca>(`${this.baseUrl}/${marca.id}`, marca);
    }
  
    delete(marca: Marca): Observable<any> {
      return this.httpClient.delete<any>(`${this.baseUrl}/${marca.id}`);
    }
    deletadoById(id:number): Observable<any> {
      return this.httpClient.put<any>(`${this.baseUrl}/deletado/${id}`,null);
    }
    desativadoById(id:number): Observable<any> {
      return this.httpClient.put<any>(`${this.baseUrl}/desativado/${id}`,null);
    }
}