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
import { Oferta } from '../../../model/oferta.model';
import { NgFor } from '@angular/common';
import { OfertaService } from '../../../services/oferta.service';
import { Carro } from '../../../model/carro.model';

@Component({
  selector: 'app-oferta-form',
  standalone: true,
  imports: [NgIf,NgFor, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule],
  templateUrl: './oferta-form.components.html',
  styleUrl: './oferta-form.components.css'
})
export class OfertaFormComponent{

  formGroup: FormGroup;
  carros: String[] = ['Carro1', 'Carro2', 'Carro3', 'Carro4'];
  categorias: String[] = ['Categoria1', 'Categoria2', 'Categoria3', 'Categoria4'];
  usuarios: String[] = ['Usuario1', 'Usuario2', 'Usuario3', 'Usuario4'];

  constructor(private formBuilder: FormBuilder,
    private ofertaService: OfertaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const oferta: Oferta = activatedRoute.snapshot.data['oferta'];

    this.formGroup = formBuilder.group({
      id: [(oferta && oferta.id) ? oferta.id : null],
      nome: [(oferta && oferta.nome) ? oferta.nome : '', Validators.required],
      carros: [(oferta && oferta.carros) ? oferta.carros : ''],
      categorias: [(oferta && oferta.categorias) ? oferta.categorias : ''],
      usuarios: [(oferta && oferta.usuarios) ? oferta.usuarios : ''],
      porcentagemDeDesconto : [(oferta && oferta.porcentagemDeDesconto) ? oferta.porcentagemDeDesconto : '']
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const oferta = this.formGroup.value;
      if (oferta.id ==null) {
        this.ofertaService.insert(oferta).subscribe({
          next: (ofertaCadastrado) => {
            this.router.navigateByUrl('/ofertas');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.ofertaService.update(oferta).subscribe({
          next: (ofertaAlterado) => {
            this.router.navigateByUrl('/ofertas');
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
      const oferta = this.formGroup.value;
      if (oferta.id != null) {
        this.ofertaService.delete(oferta).subscribe({
          next: () => {
            this.router.navigateByUrl('/ofertas');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

}