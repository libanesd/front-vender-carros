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
import { Carro } from '../../../model/carro.model';
import { CarroService } from '../../../services/carro.service';
import { ThemeService } from '../../../theme.service.spec';
import { MatIconModule } from '@angular/material/icon';
import { Marca } from '../../../model/marca.model';
import { MarcaService } from '../../../services/marca.service';

@Component({
  selector: 'app-carro-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule,MatIconModule],
  templateUrl: './carro-form.components.html',
  styleUrl: './carro-form.component.css'
})
export class CarroFormComponent implements OnInit {

  isDarkMode: boolean = false;
  marcas: Marca[] = [];
  marcasJson: Marca[] = [];
  instancia: Carro = new Carro();
  instanciaMarca: Marca | null = null;
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private marcaService : MarcaService,
    private themeService: ThemeService,
    private carroService: CarroService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const carro: Carro = activatedRoute.snapshot.data['carro']; 

    this.formGroup = formBuilder.group({
      id: [(carro && carro.id) ? carro.id : null],
      nome: [(carro && carro.nomeCarro) ? carro.nomeCarro : '', Validators.required],
      carroSpec: ['', Validators.required], // campo do tipo string
      versao: ['', Validators.required], // campo do tipo string
      ano: ['', Validators.required], // campo do tipo string
      cor: ['', Validators.required], // campo do tipo string
      caracteristicas: ['', Validators.required], // campo do tipo string
      cidade: ['', Validators.required], // campo do tipo string
      preco: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]], // campo do tipo float
      kilometragem: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]], // campo do tipo float
    });

    this.isDarkMode = this.themeService.isDarkMode();
  }

  ngOnInit(): void {
    this.marcaService.findAll().subscribe(marc => {
      this.marcasJson = marc;
      console.log(this.marcasJson);
      this.marcas = Marca.fromJSONArray(marc);
    });
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }

  salvar() {
    if (this.formGroup.valid) {
      const carro = this.formGroup.value;
      if (carro.id ==null) {
        this.carroService.insert(carro).subscribe({
          next: (carroCadastrado) => {
            this.router.navigateByUrl('/carros');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.carroService.update(carro).subscribe({
          next: (carroAlterado) => {
            this.router.navigateByUrl('/carros');
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
      const carro = this.formGroup.value;
      if (carro.id != null) {
        this.carroService.delete(carro).subscribe({
          next: () => {
            this.router.navigateByUrl('/carros');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

}