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
import { CarroService } from "../../../services/carro.service";
import { Carro } from "../../../model/carro.model";
import { CarrinhoService } from "../../../services/carrinho.service";


@Component({
    selector: 'recuperar-senha-form',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
      RouterModule],
    templateUrl: './venda-list.components.html',
    styleUrl: './venda-list.component.css'
  })
export class CarrinFormComponent implements OnInit{

    carro!: Carro;

    formGroup!: FormGroup;

    constructor(private formBuilder: FormBuilder,
      private carrinhoService: CarrinhoService,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar) {

        }
      ngOnInit(): void {
        this.carro = this.carrinhoService.getCarroCarrinho();
        console.log(this.carro)
      }

}