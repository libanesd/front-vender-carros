import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../model/categoria.model';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule],
  templateUrl: './categoria-list.components.html',
  styleUrl: './categoria-list.component.css'
})
export class CategoriaListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nomecategoria'];
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) {

  }

    ngOnInit(): void {
        this.categoriaService.findAll().subscribe(data => {
            this.categorias = data;
        })
    }

}