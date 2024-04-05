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
import { ThemeService } from '../../../theme.service.spec';
import { MatIconModule } from '@angular/material/icon';
import { Categoria } from '../../../model/categoria.model';
import { Usuario } from '../../../model/usuario.model';
import { CarroService } from '../../../services/carro.service';
import { CategoriaService } from '../../../services/categoria.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-oferta-form',
  standalone: true,
  imports: [NgIf,NgFor, ReactiveFormsModule, MatFormFieldModule, MatIconModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule],
  templateUrl: './oferta-form.components.html',
  styleUrl: './oferta-form.components.css'
})
export class OfertaFormComponent implements OnInit{

  formGroup: FormGroup;
  carros: Carro[] = [];
  categorias: Categoria[] = [];
  usuarios: Usuario[] = [];

  isDarkMode: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private themeService: ThemeService,
    private carroService: CarroService,
    private categoriaService: CategoriaService,
    private usuarioService: UsuarioService,
    private ofertaService: OfertaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      carros: ['', Validators.required],
      categorias: ['', Validators.required],
      usuarios: ['', Validators.required],
      porcentagemDeDesconto : ['', Validators.required]
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
    this.categoriaService.findAll().subscribe(cat => {
      if(cat !== undefined){
        this.categorias = cat;
        this.formGroup.patchValue({
          categoria: cat
        });
      }
    });
    this.usuarioService.findAll().subscribe(usuar => {
      if(usuar !== undefined){
        this.usuarios = usuar;
        this.formGroup.patchValue({
          usuario: usuar
        });
      }
    });
    this.initializeForm();
  }

  initializeForm() {

    const oferta: Oferta = this.activatedRoute.snapshot.data['oferta'];

    if (oferta !== undefined && oferta.carros !== undefined) {
      oferta.carros.forEach(carr => {
        const carro = this.carros
        .find(carro => carro.id === (carr?.id || null));
        if(carro !== undefined){
          carr = carro;
        }
      });
    }
    if (oferta !== undefined && oferta.categorias !== undefined) {
      oferta.categorias.forEach(categor => {
        const categoria = this.categorias
        .find(categoria => categoria.id === (categor?.id || null));
        if(categoria !== undefined){
          categor = categoria;
        }
      });
    }
    if (oferta !== undefined && oferta.categorias !== undefined) {
      oferta.usuarios.forEach(user => {
        const usuario = this.usuarios
        .find(usuario => usuario.id === (user?.id || null));
        if(usuario !== undefined){
          user = usuario;
        }
      });
    }
    this.formGroup = this.formBuilder.group({
      id: [(oferta && oferta.id) ? oferta.id : null],
      nome: [(oferta && oferta.nome) ? oferta.nome : '', Validators.required],
      carros: [(oferta && oferta.carros) ? oferta.carros : null],
      categorias: [(oferta && oferta.categorias) ? oferta.categorias : null],
      usuarios: [(oferta && oferta.usuarios) ? oferta.usuarios : null],
      porcentagemDeDesconto : [(oferta && oferta.porcentagemDeDesconto) ? oferta.porcentagemDeDesconto : '']
    });
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }

  salvar() {
    if (this.formGroup.valid) {
      const oferta = this.formGroup.value;
      console.log(oferta);
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