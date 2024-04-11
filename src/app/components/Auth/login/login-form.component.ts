import { NgFor, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
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
    imports: [NgIf,NgFor, ReactiveFormsModule, MatFormFieldModule,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
      RouterModule, MatSelectModule,MatIconModule],
    templateUrl: './login-form.components.html',
    styleUrl: './login-form.components.css'
  })
export class LoginFormComponent {

    formGroup: FormGroup;
    isDarkMode: boolean = false;

    constructor(private formBuilder: FormBuilder,
        private themeService: ThemeService,
        private authService: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute) {
    
        const usuario: Usuario = activatedRoute.snapshot.data['usuario'];
    
        this.formGroup = formBuilder.group({
          login: [(usuario && usuario.login) ? usuario.login : null, Validators.required],
          senha: [(usuario && usuario.senha) ? usuario.senha : null, Validators.required]
        });
        this.isDarkMode = this.themeService.isDarkMode();
    }
    
    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.themeService.setDarkMode(this.isDarkMode);
      }

    entrar(){
        if (this.formGroup.valid) {
            const usuario = this.formGroup.value;
            this.authService.login(usuario).subscribe({
              next: (usuarioCadastrado) => {
                console.log(usuarioCadastrado);
                this.router.navigateByUrl('/produtos');
              },
              error: (err) => {
                console.log('Erro ao Incluir' + JSON.stringify(err));
              }
            });
          }
    }
}