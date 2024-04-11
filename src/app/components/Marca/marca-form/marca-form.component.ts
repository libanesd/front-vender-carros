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
import { Marca } from '../../../model/marca.model';
import { NgFor } from '@angular/common';
import { MarcaService } from '../../../services/marca.service';
import { ThemeService } from '../../../theme.service.spec';
import { Carro } from '../../../model/carro.model';
import { MatIconModule } from '@angular/material/icon';
import { CarroService } from '../../../services/carro.service';

@Component({
  selector: 'app-marca-form',
  standalone: true,
  imports: [NgIf,NgFor, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule,MatIconModule],
  templateUrl: './marca-form.components.html',
  styleUrl: './marca-form.components.css'
})
export class MarcaFormComponent implements OnInit{

  formGroup: FormGroup;
  isDarkMode: boolean = false;
  carros: Carro[] = [];

  constructor(private formBuilder: FormBuilder,
    private themeService: ThemeService,
    private carroService : CarroService,
    private marcaService: MarcaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      carros: ['']
    });
    this.isDarkMode = this.themeService.isDarkMode();
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
    this.initializeForm();
  }

  initializeForm() {

    const marca: Marca = this.activatedRoute.snapshot.data['marca'];

    // selecionando a carro
    if (marca !== undefined && marca.carros !== undefined) {
      marca.carros.forEach(carr => {
        const carro = this.carros
        .find(carro => carro.id === (carr?.id || null));
        if(carro !== undefined){
          carr = carro;
        }
      });
    }

    this.formGroup = this.formBuilder.group({
      id: [(marca && marca.id) ? marca.id : null],
      nome: [(marca && marca.nome) ? marca.nome : '', Validators.required],
      carros: [(marca && marca.carros) ? marca.carros : null]
    });
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }

  salvar() {
    if (this.formGroup.valid) {
      const marca = this.formGroup.value;
      if (marca.id ==null) {
        this.marcaService.insert(marca).subscribe({
          next: (marcaCadastrado) => {
            this.router.navigateByUrl('/marcas');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.marcaService.update(marca).subscribe({
          next: (marcaAlterado) => {
            this.router.navigateByUrl('/marcas');
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
      const marca = this.formGroup.value;
      if (marca.id != null) {
        this.marcaService.delete(marca).subscribe({
          next: () => {
            this.router.navigateByUrl('/marcas');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

}