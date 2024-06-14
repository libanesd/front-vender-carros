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
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { QRCodeModule } from "angularx-qrcode";
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ImageModule } from 'primeng/image';
import { VendaService } from "../../../services/venda.service";
import { Venda } from "../../../model/venda.model";
import { StatusVenda } from "../../../model/statusVenda.enum";
import { UsuarioId } from "../../../model/usuarioId.model";

@Component({
    selector: 'recuperar-senha-form',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,TableModule, TagModule, RatingModule, ButtonModule, CommonModule,QRCodeModule,ImageModule,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,ConfirmDialogModule ,DialogModule,RippleModule,ToastModule,ProgressSpinnerModule,
      ToolbarModule,InputTextModule,InputTextareaModule,FileUploadModule,DropdownModule,RadioButtonModule,FormsModule,InputNumberModule,
      RouterModule],
    templateUrl: './carrinho-list.components.html',
    styleUrl: './carrinho-list.component.css'
  })
export class CarrinhoListComponent implements OnInit{

    carro!: Carro;
    carros!: Carro[];
    productDialog: boolean = false;
    gerarQrCodeDialog: boolean = false;
    showIcon: boolean = false;
    submitted: boolean = false;
    formGroup!: FormGroup;

    venda!: Venda;

    constructor(private formBuilder: FormBuilder,
        private carrinhoService: CarrinhoService,
        private vendaService: VendaService,
        private usuarioService: UsuarioService,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar) {}

    ngOnInit(): void {
      this.carros = [];
      this.carro = this.carrinhoService.getCarroCarrinho();
      if(this.carro === undefined) {
        this.router.navigateByUrl('/home');
        return;
      }
      console.log("o carro do carrinho:"+this.carro)
      this.carros.push(this.carro);
      this.formGroup = this.formBuilder.group({
        carros : this.carros
      });
      console.log(this.carros)
    }

    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
    }
    deleteProduct(carro: Carro) {
      this.carros = this.carros.filter((val) => val.id !== carro.id);
      this.formGroup.reset({
        carros: this.carros
      });
      console.log(this.formGroup.value);
      if(this.carros.length > 0) {
        console.log(this.carros);
      }
    }
    editProduct(carro: Carro) {
      this.carro = carro;
      this.productDialog = true;
    }
    comprar(carro: Carro) {
      this.gerarQrCodeDialog = true;
      console.log(carro);
      this.venda = new Venda(new Date(),carro.preco,"Compra Finalizada com sucesso!!",carro,StatusVenda.Aprovada,new UsuarioId(1));
      console.log(this.venda);
      this.vendaService.insert(this.venda).subscribe({
        next: (venda) => {
          console.log(venda);
          this.router.navigateByUrl('/home');
        },
        error: (err) => {
          console.log('Erro ao Incluir' + JSON.stringify(err));
        }
      });
      setTimeout(() => {
        this.showIcon = true;
        setTimeout(() => {
          
          this.router.navigateByUrl("/home");
        }, 3000);
      }, 5000);
    }

}