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
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../../theme.service.spec';
import { Carro } from '../../../model/carro.model';
import { Oferta } from '../../../model/oferta.model';
import { CarroService } from '../../../services/carro.service';
import { OfertaService } from '../../../services/oferta.service';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [NgIf,NgFor, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule, MatIconModule],
  templateUrl: './categoria-form.components.html',
  styleUrl: './categoria-form.components.css'
})
export class CategoriaFormComponent implements OnInit {

  formGroup: FormGroup;
  isDarkMode: boolean = false;
  carros : Carro[] = [];
  ofertas : Oferta[] = [];
  carro : Carro | null = null;
  oferta : Oferta | null = null;


  constructor(private formBuilder: FormBuilder,
    private themeService: ThemeService,
    private carroService: CarroService,
    private ofertaService: OfertaService,
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.formGroup = this.formBuilder.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      carros:[null],
      ofertas:[null]
    });
    
  }
  ngOnInit(): void {
    this.carroService.findAll().subscribe(carr => {
      if(carr !== undefined){
        this.carros = carr;
        this.formGroup.patchValue({
          carro: carr
        });
      }
    });
    this.ofertaService.findAll().subscribe(ofert => {
      if(ofert !== undefined){
        this.ofertas = ofert;
        this.formGroup.patchValue({
          oferta: ofert
        });
      }
    })
    this.initializeForm();
  }

  initializeForm() {

    const categoria: Categoria = this.activatedRoute.snapshot.data['categoria'];

    if (categoria !== undefined && categoria.carros !== undefined) {
      categoria.carros.forEach(carr => {
        const carro = this.carros
        .find(carro => carro.id === (carr?.id || null));
        if(carro !== undefined){
          carr = carro;
        }
      });
    }
    if (categoria !== undefined && categoria.ofertas !== undefined) {
      categoria.ofertas.forEach(ofert => {
        const oferta = this.ofertas
        .find(oferta => oferta.id === (ofert?.id || null));
        if(oferta !== undefined){
          ofert = oferta;
        }
      });
    }
    
    this.formGroup = this.formBuilder.group({
      id: [(categoria && categoria.id) ? categoria.id : null],
      nome: [(categoria && categoria.nome) ? categoria.nome : null],
      carros:[(categoria && categoria.carros) ? categoria.carros : null],
      ofertas:[(categoria && categoria.ofertas) ? categoria.ofertas : null]
    });
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
  salvar() {
    if (this.formGroup.valid) {
      const categoria = this.formGroup.value;
      if (categoria.id ==null) {
        this.categoriaService.insert(categoria).subscribe({
          next: (categoriaCadastrado) => {
            this.router.navigateByUrl('/admin/categorias');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.categoriaService.update(categoria).subscribe({
          next: (categoriaAlterado) => {
            this.router.navigateByUrl('/admin/categorias');
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