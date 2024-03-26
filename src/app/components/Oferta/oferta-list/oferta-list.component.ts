import { Component, OnInit } from '@angular/core';
import { OfertaService } from '../../../services/oferta.service';
import { Oferta } from '../../../model/oferta.model';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../theme.service.spec';


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

  isDarkMode: boolean = false;


  constructor(private ofertaService: OfertaService,
        private themeService: ThemeService
                                          ) {

  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }

    ngOnInit(): void {
        this.ofertaService.findAll().subscribe(data => {
            this.ofertas = data;
        })
    }

}