import { Component, OnInit } from '@angular/core';
import { OfertaService } from '../../../services/oferta.service';
import { Oferta } from '../../../model/oferta.model';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-oferta-form',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule],
  templateUrl: './oferta-list.components.html',
  styleUrl: './oferta-list.component.css'
})
export class OfertaListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nomeoferta'];
  ofertas: Oferta[] = [];

  constructor(private ofertaService: OfertaService) {

  }

    ngOnInit(): void {
        this.ofertaService.findAll().subscribe(data => {
            this.ofertas = data;
        })
    }

}