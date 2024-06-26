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
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-oferta-form',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule],
  templateUrl: './oferta-list.components.html',
  styleUrl: './oferta-list.component.css'
})
export class OfertaListComponent implements OnInit{

  formGroup: FormGroup;
  displayedColumns: string[] = ['id', 'nome','acao'];
  ofertas: Oferta[] = [];

  isDarkMode: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private ofertaService: OfertaService,
        private themeService: ThemeService
                                          ) {

    this.formGroup = formBuilder.group({

    });
  }

  deletar(oferta:Oferta){
    this.ofertaService.deletadoById(oferta.id).subscribe({
      next(res){
        console.log(res);
      },
      error(err){
        console.log(err);
      }
    });
  }


  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }

    ngOnInit(): void {
        this.ofertaService.findAll().subscribe(data => {
            this.ofertas = Oferta.fromJSONArray(data);
        })
    }

}