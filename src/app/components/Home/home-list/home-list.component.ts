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
import { UsuarioLogadoService } from "../../../services/usuario-logado.service";


@Component({
    selector: 'home-list',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,CarouselModule,ButtonModule,TagModule,
      ThemeDirective, CarouselComponent, CarouselIndicatorsComponent, CarouselInnerComponent, NgFor, CarouselItemComponent, CarouselCaptionComponent, CarouselControlComponent, RouterLink,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
      RouterModule],
    templateUrl: './home-list.components.html',
    styleUrl: './home-list.components.css'
  })
export class LogFormComponent implements OnInit{

    formGroup!: FormGroup;
    carros!: Carro[] ;
    slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });
    responsiveOptions: any[] | undefined;

    constructor(private formBuilder: FormBuilder,
      private usuarioLogadoService: UsuarioLogadoService,
      private carrinhoService: CarrinhoService,
      private carroService: CarroService,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar) {
          console.log("agora tá aq");
        }

    ngOnInit(): void {
      this.carroService.findCarrosAVenda().subscribe(data => {
          this.carros = Carro.fromJSONArray(data);
          console.log(data);
          this.carros.map((carro) => {
            carro.nomeImagem = this.usuarioLogadoService.getUrlImagem(carro.nomeImagem);
          })
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
      this.carrinhoService.adicionar(produto);
      this.router.navigateByUrl('/carrinho');
    }
    verDetalhesCarro(produto: Carro){
      this.carroService.setCarro(produto);
      this.router.navigateByUrl('/detalhe-do-produto');
    }
}