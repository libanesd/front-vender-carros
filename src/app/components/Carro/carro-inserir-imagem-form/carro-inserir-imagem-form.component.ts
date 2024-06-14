import { NgFor, NgIf,Location } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router, RouterModule } from "@angular/router";
import { MessageService } from 'primeng/api';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { AuthService } from "../../../services/auth.service";
import { MatIconModule } from '@angular/material/icon';
import { UsuarioLogadoService } from "../../../services/usuario-logado.service";

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
    selector: 'app-custom-file-input',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,FileUploadModule, ToastModule, CommonModule,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,MatIconModule,
      RouterModule],
      providers: [MessageService],
    templateUrl: './carro-inserir-imagem-form.components.html',
    styleUrl: './carro-inserir-imagem-form.components.css'
  })
export class CarroInserirImagemFormComponent implements OnInit {

    fileName: string = '';

    selectedFile: File | null = null; 
    imagePreview: string | ArrayBuffer | null = null;

    @Output() fileSelected = new EventEmitter<File>();
    file!: File

    uploadedFiles: any[] = [];

    formGroup!: FormGroup;

    constructor(private formBuilder: FormBuilder,
      private usuarioLogadoService: UsuarioLogadoService,
      private location: Location,
      private messageService: MessageService,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar) {}

    carregarImagemSelecionada(event: any) {
      this.selectedFile = event.target.files[0];
  
      if (this.selectedFile) {
        this.fileName = this.selectedFile.name;
        // carregando image preview
        const reader = new FileReader();
        reader.onload = e => this.imagePreview = reader.result;
        reader.readAsDataURL(this.selectedFile);
      }
  
      console.log(this.selectedFile);
      console.log(this.fileName);
    }

    voltarPagina() {
      this.location.back();
    }
    ngOnInit(): void {
      this.formGroup = this.formBuilder.group({
        id: [''],
        nomeImagem: ['',]
      });
    }
    public uploadDaImagem() {
      if (this.selectedFile) {
        this.usuarioLogadoService.uploadImagem(this.formGroup.get('id')!.value, this.selectedFile.name, this.selectedFile)
        .subscribe({
          next: () => {
            this.voltarPagina();
          },
          error: err => {
            console.log('Erro ao fazer o upload da imagem',err);
            // tratar o erro
          }
        })
      } else {
        this.voltarPagina();
      }
    }
    
}