import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../model/categoria.model';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../theme.service.spec';


@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule],
  templateUrl: './detalhe-do-produto-form.components.html',
  styleUrl: './detalhe-do-produto-form.component.css'
})
export class DetalheDoProdutoFormComponent{

  constructor(private categoriaService: CategoriaService,
    private themeService: ThemeService) {

  }

}