import { NgFor, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
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
import { UsuarioLogadoService } from "../../../services/usuario-logado.service";

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,FileUploadModule, ToastModule, CommonModule,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
      RouterModule],
      providers: [MessageService],
    templateUrl: './carro-inserir-imagem-form.components.html',
    styleUrl: './carro-inserir-imagem-form.components.css'
  })
export class CarroInserirImagemFormComponent implements OnInit {

    uploadedFiles: any[] = [];

    formGroup!: FormGroup;
$event: any;

    constructor(private formBuilder: FormBuilder,
      private usuarioLogadoService: UsuarioLogadoService,
      private messageService: MessageService,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar) {}

    ngOnInit(): void {
      this.formGroup = this.formBuilder.group({
        id: [''],
        nomeImagem: ['',],
        imagem: ['']
      });
    }
    uploadDaImagem(event: any) {
      for(let file of event.files) {
        this.uploadedFiles.push(file);
      }
      console.log(this.uploadedFiles);
      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
      console.log("está chegando aq");
      const file = event.files[0];
      const id = this.formGroup.get('id')!.value;

      console.log(file);
      console.log(id);

      const data = {
        nomeImagem: this.formGroup.get('nomeImagem')!.value,
        image: file
      }

      this.usuarioLogadoService.uploadImage(id,data)
        .then(data => {
          console.log('Image uploaded successfully!', data);
        })
        .catch(error => {
          console.error('There was an error uploading the image!', error);
        });
    }
    
}