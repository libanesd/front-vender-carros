import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro } from '../model/carro.model';

@Injectable({
    providedIn: 'root'
  })
export class CarroService {
  
    private carro!: Carro;
    private baseUrl = 'http://localhost:8080/carros';

    constructor(private httpClient: HttpClient) {  }
  
    findAll(): Observable<Carro[]> {
      return this.httpClient.get<Carro[]>(this.baseUrl);
    }

    findCarrosAVenda(): Observable<Carro[]> {
      return this.httpClient.get<Carro[]>(`${this.baseUrl}/carros-a-venda`);
    }
  
    findById(id: string): Observable<Carro> {
      return this.httpClient.get<Carro>(`${this.baseUrl}/${id}`);
    }
  
    insert(carro: Carro,jwt:String): Observable<Carro> {
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
        marca: carro.marca,
      }
      // const headers = {
      //   Authorization: `Bearer ${jwt}`,
      //   'Content-Type': 'application/json',
      //   'X-Role': 'Admin', // or 'Admin' depending on the role
      // };
    
      // const options = { headers };
      return this.httpClient.post<Carro>(`http://localhost:8080/carros/insert`, data);
    }
    
    update(carro:Carro): Observable<Carro> {
      return this.httpClient.put<Carro>(`${this.baseUrl}/${carro.id}`, carro);
    }
  
    delete(carro: Carro): Observable<any> {
      return this.httpClient.delete<any>(`${this.baseUrl}/${carro.id}`);
    }

    setCarro(carro: Carro) {
      this.carro = carro;
    }
  
    getCarro() {
      return this.carro;
    }
}