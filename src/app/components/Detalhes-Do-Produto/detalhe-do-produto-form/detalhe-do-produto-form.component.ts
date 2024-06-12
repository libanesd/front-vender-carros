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
  selector: 'app-categoria-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,CarouselModule,ButtonModule,
    ThemeDirective, CarouselComponent, CarouselIndicatorsComponent, CarouselInnerComponent, NgFor, CarouselItemComponent, CarouselCaptionComponent, CarouselControlComponent, RouterLink,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
    RouterModule],
  templateUrl: './detalhe-do-produto-form.components.html',
  styleUrl: './detalhe-do-produto-form.component.css'
})
export class DetalheDoProdutoFormComponent implements OnInit{

  formGroup!: FormGroup;
  carro!: Carro;
  carros!: Carro[] ;
  responsiveOptions: any[] | undefined;

  constructor(private formBuilder: FormBuilder,
    private carrinhoService: CarrinhoService,
    private router: Router,
    private carroService: CarroService,
    private themeService: ThemeService) {
  }
  ngOnInit(): void {
    this.carro = this.carroService.getCarro();
    if(this.carro === undefined){
      this.router.navigateByUrl('/teste');
    }
    this.formGroup = this.formBuilder.group({
      carro: this.carro
    });
    console.log(this.formGroup.value);
    this.carroService.findAll().subscribe(data => {
        this.carros = Carro.fromJSONArray(data);
    })
  }

  adicionarCarroEmCarrinho(produto: Carro){
    console.log(produto);
    this.carrinhoService.setCarroCarrinho(produto);
    this.router.navigateByUrl('/teste2');
  }
  verDetalhesCarro(produto: Carro){
    console.log(produto);
    this.carroService.setCarro(produto);
    this.formGroup.reset({
      carro: produto
    });
    this.carro = produto;
    console.log(this.formGroup.value);
  }

}