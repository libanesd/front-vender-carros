import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../../../services/marca.service';
import { Marca } from '../../../model/marca.model';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../theme.service.spec';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-marca-form',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule],
  templateUrl: './marca-list.components.html',
  styleUrl: './marca-list.component.css'
})
export class MarcaListComponent implements OnInit{

  formGroup: FormGroup;
  displayedColumns: string[] =  ['id', 'nome', 'acao'];
  isDarkMode: boolean = false;

  marcas: Marca[] = []

  constructor(private formBuilder: FormBuilder,
    private marcaService: MarcaService,
    private themeService: ThemeService) {


      this.formGroup = formBuilder.group({

      });
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
  ngOnInit(): void {
      this.marcaService.findAll().subscribe(data => {
        console.log(data);
        this.marcas = Marca.fromJSONArray(data);
      })
  }

}