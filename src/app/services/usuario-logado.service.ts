import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioLogado } from '../model/usuarioLogado';
import axios, { AxiosInstance } from 'axios';
import { Router } from '@angular/router';
import { Carro } from '../model/carro.model';

@Injectable({
    providedIn: 'root'
  })
export class UsuarioLogadoService {

    private axiosClient: AxiosInstance;
    private baseUrl = 'http://localhost:8080/usuariologado';

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
    }

    getUrlImagem(nomeImagem: string): string {
        return `${this.baseUrl}/download/imagem/${nomeImagem}`;
      }

    uploadImagem(id: number, nomeImagem: string, imagem: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('nomeImagem', imagem.name);
        formData.append('imagem', imagem, imagem.name);
        console.log(formData);
        return this.http.patch<Carro>(`${this.baseUrl}/upload/imagem/${id}`, formData);
    }
    
    
    async uploadImage(id: string,data: any): Promise<any> {
        console.log(data);
        
        let dataReal = new FormData();
        dataReal.append('nomeImagem', '65a656f3-4078-4c98-a505-01f9dc35ec44.jpeg');
        dataReal.append('imagem', data.imagem);
        console.log(dataReal);

        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `localhost:8080/usuariologado/upload/imagem/${id}`,
            headers: {
                'Content-Type': 'application/json'
              },
            data : data
        };
        const response = await axios.request(config)
                                    .then((response) => {
                                        console.log(JSON.stringify(response.data));
                                        return response.data;
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });

        return response;
    }

}