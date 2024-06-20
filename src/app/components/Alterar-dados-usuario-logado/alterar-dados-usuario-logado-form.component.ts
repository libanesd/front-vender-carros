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
import { ThemeService } from "../../theme.service.spec";
import { UsuarioService } from "../../services/usuario.service";
import { Usuario } from "../../model/usuario.model";
import { AuthService } from "../../services/auth.service";
import { UsuarioDadosPessoais } from "../../model/usuarioDadosPessoais.model";

@Component({
    selector: 'meu-perfil-form',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
      RouterModule],
    templateUrl: './alterar-dados-usuario-logado-form.components.html',
    styleUrl: './alterar-dados-usuario-logado-form.components.css'
  })
export class AlterarDadosUsuarioLogadoFormComponent implements OnInit {

    formGroup!: FormGroup;

    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar) {

        }

    ngOnInit(): void {
      this.authService.getUsuarioDadosPessoais().forEach((dadosPessoais)=>{
        if(dadosPessoais){
          this.formGroup = this.formBuilder.group({
            id: [dadosPessoais.id],
            login: [dadosPessoais?.login],
            email: [dadosPessoais?.email],
            cpf: [dadosPessoais?.cpf],
            senha: [''],
          });
        }else{
          this.router.navigate(['/home']);
        }
        
      })
    }
    alterar(){
      const users = this.authService.getUsuarioLogado();
      
      const id = this.formGroup.get("id")!.value;
      const email = this.formGroup.get("email")!.value;
      const cpf = this.formGroup.get("cpf")!.value;
      const senha = this.formGroup.get("senha")!.value;

      let usuario = new UsuarioDadosPessoais();
      usuario.id = id;
      users.forEach((user) => {
        usuario.login = user!.login;
      })
      usuario.email = email;
      usuario.cpf = cpf;
      usuario.senha = senha;
      console.log(usuario); 
      this.authService.updateDadosPessoaisUsuarioLogado(usuario).subscribe({
        next: (res) => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log('Erro ao Excluir' + JSON.stringify(err));
        }
      });
      this.router.navigate(['/home']);
    }
    showSnackbarTopPosition(content: any, action: any, duration: any) {
      this.snackBar.open(content, action, {
        duration: 2000,
        verticalPosition: "top", // Allowed values are  'top' | 'bottom'
        horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      });
    }
}