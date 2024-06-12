import { NgFor, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { ThemeService } from "../../../theme.service.spec";
import { UsuarioService } from "../../../services/usuario.service";
import { Usuario } from "../../../model/usuario.model";
import { AuthService } from "../../../services/auth.service";
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { CarouselCaptionComponent,
  CarouselComponent,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  ThemeDirective } from '@coreui/angular';
import { Carro } from "../../../model/carro.model";
import { CarroService } from "../../../services/carro.service";
import { CarrinhoService } from "../../../services/carrinho.service";


@Component({
    selector: 'recuperar-senha-form',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,CarouselModule,ButtonModule,TagModule,
      ThemeDirective, CarouselComponent, CarouselIndicatorsComponent, CarouselInnerComponent, NgFor, CarouselItemComponent, CarouselCaptionComponent, CarouselControlComponent, RouterLink,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
      RouterModule],
    templateUrl: './venda-form.components.html',
    styleUrl: './venda-form.components.css'
  })
export class LogFormComponent implements OnInit{

    formGroup!: FormGroup;
    carros!: Carro[] ;
    slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });
    responsiveOptions: any[] | undefined;

    constructor(private formBuilder: FormBuilder,
      private carrinhoService: CarrinhoService,
      private carroService: CarroService,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar) {}

    ngOnInit(): void {
      this.carroService.findAll().subscribe(data => {
        console.log(data);
          this.carros = Carro.fromJSONArray(data);
      })

      this.slides[0] = {
        id: 0,
        src: './assets/images/carros/carroRapido1.jpg',
      };
      this.slides[1] = {
        id: 1,
        src: './assets/images/carros/carroRapido2.jpg',
      };
      this.slides[2] = {
        id: 2,
        src: './assets/images/carros/carroRapido3.jpg',
      };
    }

    adicionarCarroEmCarrinho(produto: Carro){
      console.log(produto);
      this.carrinhoService.setCarroCarrinho(produto);
      this.router.navigateByUrl('/teste2');
    }
    verDetalhesCarro(produto: Carro){
      console.log(produto);
      this.carroService.setCarro(produto);
      this.router.navigateByUrl('/detalhe-do-produto');
    }
}