import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../model/usuario.model';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../theme.service.spec';


@Component({
  selector: 'app-Usuario-form',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule],
  templateUrl: './usuario-list.components.html',
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nomeUsuario'];
  isDarkMode: boolean = false;
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService,
    private themeService: ThemeService) {
      this.isDarkMode = this.themeService.isDarkMode();
  }
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
  
  ngOnInit(): void {
      this.usuarioService.findAll().subscribe(data => {
        console.log(data);
          this.usuarios = Usuario.fromJSONArray(data);
      })
  }

}