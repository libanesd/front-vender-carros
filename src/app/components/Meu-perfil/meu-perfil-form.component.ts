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
import { LocalStorageService } from "@coreui/angular";
import { UsuarioLogado } from "../../model/usuarioLogado";
import { UsuarioDadosBasicos } from "../../model/usuarioDadosBasicos.model";

@Component({
    selector: 'meu-perfil-form',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
      RouterModule],
    templateUrl: './meu-perfil-form.components.html',
    styleUrl: './meu-perfil-form.components.css'
  })
export class MeuPerfilFormComponent implements OnInit {

    formGroup!: FormGroup;
    usuario!: UsuarioLogado;

    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        private usuarioService: UsuarioService,
        private localStorageService: LocalStorageService,
        private router: Router,
        private snackBar: MatSnackBar) {}

    ngOnInit(): void {
      this.usuario = this.localStorageService.getItem("usuario-logado");
      const users = this.authService.getUsuarioLogado();
      users.forEach((user) => {
        if(user){
          this.formGroup = this.formBuilder.group({
            id: [user?.id],
            nome: [user?.nome],
            endereco: [user?.endereco],
            telefone: [user?.telefone],
            senha: [''],
          });
        }else{
          this.router.navigate(['/login']);
        }
      })
    }
    alterarLoginECpf(){
      const senha = this.formGroup.get("senha")!.value;
      this.authService.verificarSenha(senha).subscribe({
        next: (res) => {
          this.router.navigate(['/alterar-dados']);
        },
        error: (err) => {
          console.log('Erro ao Excluir' + JSON.stringify(err));
        }
      });
    }
    alterarDadosBasicos(){
      const users = this.authService.getUsuarioLogado();
      
      const id = this.formGroup.get("id")!.value;
      const nome = this.formGroup.get("nome")!.value;
      const endereco = this.formGroup.get("endereco")!.value;
      const telefone = this.formGroup.get("telefone")!.value;
      let usuario = new UsuarioDadosBasicos();
      usuario.id = id;
      users.forEach((user) => {
        usuario.login = user!.login;
      })
      usuario.nome = nome;
      usuario.endereco = endereco;
      usuario.telefone = telefone;

      this.authService.updateDadosBasicoUsuarioLogado(usuario).subscribe({
        next: (res) => {
          this.router.navigateByUrl('/home');
        },
        error: (err) => {
          console.log('Erro ao Excluir' + JSON.stringify(err));
        }
      });
    }
    showSnackbarTopPosition(content: any, action: any, duration: any) {
      this.snackBar.open(content, action, {
        duration: 2000,
        verticalPosition: "top", // Allowed values are  'top' | 'bottom'
        horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      });
    }
}