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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
    selector: 'recuperar-senha-form',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,MatProgressSpinnerModule,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
      RouterModule],
    templateUrl: './recuperar-senha-form.components.html',
    styleUrl: './recuperar-senha-form.components.css'
  })
export class RecuperarSenhaFormComponent implements OnInit {

    isLoading = false;

    formGroup!: FormGroup;
    response: any;

    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar) {}

    ngOnInit(): void {
      this.formGroup = this.formBuilder.group({
        login: ['', [Validators.required, Validators.minLength(3)]],
      });
    }
    async enviarCodigo(){
      const login = this.formGroup.get('login')!.value;
      console.log(login);
      try {
        this.isLoading = true;
        console.log(this.isLoading);
        const result = await this.authService.gerarCodigo(login);
        this.isLoading = false;
        console.log(this.isLoading);
        console.log('Code generated successfully', result);
      } catch (error) {
        console.error('Error generating code', error);
      }
    }
    showSnackbarTopPosition(content: any, action: any, duration: any) {
      this.snackBar.open(content, action, {
        duration: 2000,
        verticalPosition: "top", // Allowed values are  'top' | 'bottom'
        horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      });
    }
}