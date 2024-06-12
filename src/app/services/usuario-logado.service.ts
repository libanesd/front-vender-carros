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
export class UsuarioLogadoService {

    private axiosClient: AxiosInstance;

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
    
    async uploadImage(id: string,file: any): Promise<any> {
        try {
            const response = await this.axiosClient.patch(`/usuariologado/upload/imagem/${id}`, file);
            return response.data;
        } catch (error) {
            console.error('There was an error!', error);
            throw error;
        }
    }

}