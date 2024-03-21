import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Categoria } from '../../../model/categoria.model';
import { NgFor } from '@angular/common';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [NgIf,NgFor, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule],
  templateUrl: './categoria-form.components.html',
  styleUrl: './categoria-form.components.css'
})
export class CategoriaFormComponent{

  formGroup: FormGroup;
  carros : String[] = ['Carro1', 'Carro2', 'Carro3', 'Carro4'];
  ofertas : String[] = ['Oferta1', 'Oferta2', 'Oferta3', 'Oferta4'];

  constructor(private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const categoria: Categoria = activatedRoute.snapshot.data['categoria'];

    this.formGroup = formBuilder.group({
      id: [(categoria && categoria.id) ? categoria.id : null],
      nome: [(categoria && categoria.nome) ? categoria.nome : '', Validators.required],
      carros:[(categoria && categoria.carros) ? categoria.carros : ''],
      ofertas:[(categoria && categoria.ofertas) ? categoria.ofertas : '']
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const categoria = this.formGroup.value;
      if (categoria.id ==null) {
        this.categoriaService.insert(categoria).subscribe({
          next: (categoriaCadastrado) => {
            this.router.navigateByUrl('/categorias');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.categoriaService.update(categoria).subscribe({
          next: (categoriaAlterado) => {
            this.router.navigateByUrl('/categorias');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          }
        });
      }
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const categoria = this.formGroup.value;
      if (categoria.id != null) {
        this.categoriaService.delete(categoria).subscribe({
          next: () => {
            this.router.navigateByUrl('/categorias');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

}