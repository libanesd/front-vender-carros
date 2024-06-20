import { Component, OnInit } from '@angular/core';
import { CarroService } from '../../../services/carro.service';
import { Carro } from '../../../model/carro.model';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../theme.service.spec';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { GalleriaModule } from 'primeng/galleria';
import { UsuarioLogadoService } from '../../../services/usuario-logado.service';
import { FormBuilder, FormGroup } from '@angular/forms';
        
@Component({
  selector: 'app-produtos-form',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule,MatTabsModule,MatListModule],
  templateUrl: './produtos-list.components.html',
  styleUrl: './produtos-list.component.css'
})
export class ProdutosListComponent implements OnInit{
  formGroup!: FormGroup;
  displayedColumns: string[] = ['id', 'nomeCarro'];
  isDarkMode: boolean = false;
  carros: Carro[] = [];
  images: any[] | undefined;

  constructor(private carroService: CarroService,
    private formBuilder: FormBuilder,
    private usuarioLogadoService: UsuarioLogadoService,
    private themeService: ThemeService) {
      this.isDarkMode = this.themeService.isDarkMode();
  }
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
  
  ngOnInit(): void {
      this.carroService.findCarrosAVenda().subscribe(data => {
        console.log(data);
          this.carros = Carro.fromJSONArray(data);
          this.carros.map((carro) => {
            carro.nomeImagem = this.usuarioLogadoService.getUrlImagem(carro.nomeImagem);
          })
      })
      this.formGroup = this.formBuilder.group({
        carros : this.carros
      });
  }

}