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

@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
      RouterModule],
    templateUrl: './trocar-senha-form.components.html',
    styleUrl: './trocar-senha-form.components.css'
  })
export class TrocarSenhaFormComponent implements OnInit {

    formGroup!: FormGroup;

    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar) {}

    ngOnInit(): void {
      this.formGroup = this.formBuilder.group({
        senha: ['', [Validators.required, Validators.minLength(3)]],
        validadorSenha: ['', [Validators.required, Validators.minLength(3)]]
      });
    }
    entrar(){
      if (this.formGroup.valid) {
        const login = this.formGroup.get('login')!.value;
        this.authService.gerarCodigo(login)
      } else {
        this.showSnackbarTopPosition("Dados inválidos", 'Fechar', 2000);
      }
    }
    showSnackbarTopPosition(content: any, action: any, duration: any) {
      this.snackBar.open(content, action, {
        duration: 2000,
        verticalPosition: "top", // Allowed values are  'top' | 'bottom'
        horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      });
    }


    
    // entrar(){
    //     if (this.formGroup.valid) {
    //         const usuario = this.formGroup.value;
    //         this.authService.login(usuario).subscribe({
    //           next: (usuarioCadastrado) => {
    //             console.log(usuarioCadastrado);
    //             this.router.navigateByUrl('/produtos');
    //           },
    //           error: (err) => {
    //             console.log(err);
    //             this.showSnackbarTopPosition("Usuário ou senha Inválidos", 'Fechar', 2000);
    //           }
    //         });
    //       }else {
    //         this.showSnackbarTopPosition("Dados inválidos", 'Fechar', 2000);
    //       }
    // }
}