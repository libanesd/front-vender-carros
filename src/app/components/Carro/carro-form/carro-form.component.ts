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
  instancia: Carro | null = null;
  instanciaMarca: Marca | null = null;
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private marcaService : MarcaService,
    private themeService: ThemeService,
    private carroService: CarroService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id: ['', Validators.required],
      nomeCarro: ['', Validators.required],
      carroSpec: ['', Validators.required], // campo do tipo string
      versao: ['', Validators.required], // campo do tipo string
      ano: ['', Validators.required], // campo do tipo string
      cor: ['', Validators.required], // campo do tipo string
      caracteristicas: ['', Validators.required], // campo do tipo string
      cidade: ['', Validators.required], // campo do tipo string
      preco: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]], // campo do tipo float
      kilometragem: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]], // campo do tipo float
      marca:[null]
    });

    this.isDarkMode = this.themeService.isDarkMode();
  }

  ngOnInit(): void {
    this.marcaService.findAll().subscribe(marc => {
      this.marcasJson = marc;
      console.log(this.marcasJson);
      this.marcas = Marca.fromJSONArray(marc);
      this.initializeForm();
    });
  }

  initializeForm() {

    const carro: Carro = this.activatedRoute.snapshot.data['carro'];

    // selecionando a marca
    const marca = this.marcasJson
      .find(marca => marca.id === (carro?.marca?.id || null)); 

    this.formGroup = this.formBuilder.group({
      id: [(carro && carro.id) ? carro.id : null],
      nomeCarro: [(carro && carro.nomeCarro) ? carro.nomeCarro : null],
      carroSpec: [(carro && carro.carroSpec) ? carro.carroSpec : null], // campo do tipo string
      versao: [(carro && carro.versao) ? carro.versao : null], // campo do tipo string
      ano: [(carro && carro.ano) ? carro.ano : null], // campo do tipo string
      cor: [(carro && carro.cor) ? carro.cor : null], // campo do tipo string
      caracteristicas: [(carro && carro.caracteristicas) ? carro.caracteristicas : null], // campo do tipo string
      cidade: [(carro && carro.cidade) ? carro.cidade : null], // campo do tipo string
      preco: [(carro && carro.preco) ? carro.preco : null, Validators.pattern(/^\d+(\.\d{1,2})?$/)], // campo do tipo float
      kilometragem: [(carro && carro.kilometragem) ? carro.kilometragem : null, Validators.pattern(/^\d+(\.\d{1,2})?$/)], // campo do tipo float
      marca:[marca]
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