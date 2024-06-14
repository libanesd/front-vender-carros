import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria.model';

@Injectable({
    providedIn: 'root'
  })
export class CategoriaService {
    private baseUrl = 'http://localhost:8080/categorias';

    constructor(private httpClient: HttpClient) {  }
  
    findAll(): Observable<Categoria[]> {
      return this.httpClient.get<Categoria[]>(this.baseUrl);
    }
  
    findById(id: string): Observable<Categoria> {
      return this.httpClient.get<Categoria>(`${this.baseUrl}/${id}`);
    }
  
    insert(categoria: Categoria): Observable<Categoria> {
      const data = {
        nome: categoria.nome,
        carros: categoria.carros
      }
      return this.httpClient.post<Categoria>('http://localhost:8080/categorias/insert/', data);
    }
    
    update(categoria:Categoria): Observable<Categoria> {
      return this.httpClient.put<Categoria>(`${this.baseUrl}/${categoria.id}`, categoria);
    }
  
    delete(categoria: Categoria): Observable<any> {
      return this.httpClient.delete<any>(`${this.baseUrl}/${categoria.id}`);
    }
}