import { Component, OnInit } from '@angular/core';
import { CarroService } from '../../../services/carro.service';
import { Carro } from '../../../model/carro.model';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-carro-form',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule],
  templateUrl: './carro-list.components.html',
  styleUrl: './carro-list.component.css'
})
export class CarroListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nomeCarro'];
  carros: Carro[] = [];

  constructor(private carroService: CarroService) {

  }

    ngOnInit(): void {
        this.carroService.findAll().subscribe(data => {
            this.carros = data;
        })
    }

}