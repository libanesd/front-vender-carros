import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro } from '../model/carro.model';

@Injectable({
    providedIn: 'root'
  })
export class CarroService {
    private baseUrl = 'http://localhost:8080/carros';

    constructor(private httpClient: HttpClient) {  }
  
    findAll(): Observable<Carro[]> {
      return this.httpClient.get<Carro[]>(this.baseUrl);
    }
  
    findById(id: string): Observable<Carro> {
      return this.httpClient.get<Carro>(`${this.baseUrl}/${id}`);
    }
  
    insert(carro: Carro): Observable<Carro> {
      const data = {
        nomeCarro: carro.nomeCarro,
        carroSpec: carro.carroSpec,
        versao: carro.versao,
        ano: carro.ano,
        cor: carro.cor,
        caracteristicas: carro.caracteristicas,
        cidade: carro.cidade,
        preco: carro.preco,
        kilometragem: carro.kilometragem,
      }
      return this.httpClient.post<Carro>(this.baseUrl, carro);
    }
    
    update(carro:Carro): Observable<Carro> {
      return this.httpClient.put<Carro>(`${this.baseUrl}/${carro.id}`, carro);
    }
  
    delete(carro: Carro): Observable<any> {
      return this.httpClient.delete<any>(`${this.baseUrl}/${carro.id}`);
    }
}