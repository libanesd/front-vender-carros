import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Oferta } from '../model/oferta.model';

@Injectable({
    providedIn: 'root'
  })
export class OfertaService {
    private baseUrl = 'http://localhost:8080/ofertas';

    constructor(private httpClient: HttpClient) {  }
  
    findAll(): Observable<Oferta[]> {
      return this.httpClient.get<Oferta[]>(this.baseUrl);
    }
  
    findById(id: string): Observable<Oferta> {
      return this.httpClient.get<Oferta>(`${this.baseUrl}/${id}`);
    }
  
    insert(oferta: Oferta): Observable<Oferta> {
      return this.httpClient.post<Oferta>(this.baseUrl, oferta);
    }
    
    update(oferta:Oferta): Observable<Oferta> {
      return this.httpClient.put<Oferta>(`${this.baseUrl}/${oferta.id}`, oferta);
    }
  
    delete(oferta: Oferta): Observable<any> {
      return this.httpClient.delete<any>(`${this.baseUrl}/${oferta.id}`);
    }
}