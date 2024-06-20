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
import { Marca } from "../../../model/marca.model";
import { CarroService } from "../../../services/carro.service";
import { MarcaService } from "../../../services/marca.service";
import { ThemeService } from "../../../theme.service.spec";
import { UsuarioService } from "../../../services/usuario.service";
import { Usuario } from "../../../model/usuario.model";

@Component({
    selector: 'app-marca-form',
    standalone: true,
    imports: [NgIf,NgFor, ReactiveFormsModule, MatFormFieldModule,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
      RouterModule, MatSelectModule,MatIconModule],
    templateUrl: './usuario-form.components.html',
    styleUrl: './usuario-form.components.css'
  })
export class UsuarioFormComponent {

    formGroup: FormGroup;
    isDarkMode: boolean = false;

    constructor(private formBuilder: FormBuilder,
        private themeService: ThemeService,
        private usuarioService: UsuarioService,
        private router: Router,
        private activatedRoute: ActivatedRoute) {
    
        const usuario: Usuario = activatedRoute.snapshot.data['usuario'];
    
        this.formGroup = formBuilder.group({
          id: [(usuario && usuario.id) ? usuario.id : null],
          nome: [(usuario && usuario.nome) ? usuario.nome : '', Validators.required],
          cpf: [(usuario && usuario.cpf) ? usuario.cpf : '', Validators.required],
          login: [(usuario && usuario.login) ? usuario.login : null, Validators.required],
          endereco: [(usuario && usuario.endereco) ? usuario.endereco : null],
          telefone: [(usuario && usuario.telefone) ? usuario.telefone : null, Validators.required],
          email: [(usuario && usuario.email) ? usuario.email : null, Validators.required],
          senha: [(usuario && usuario.senha) ? usuario.senha : null, Validators.required]
        });
        this.isDarkMode = this.themeService.isDarkMode();
    }
    
    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.themeService.setDarkMode(this.isDarkMode);
      }

    salvar(){
        if (this.formGroup.valid) {
            const usuario = this.formGroup.value;
            if (usuario.id ==null) {
              this.usuarioService.insertUser(usuario).subscribe({
                next: (usuarioCadastrado) => {
                  this.router.navigateByUrl('/usuarios');
                },
                error: (err) => {
                  console.log('Erro ao Incluir' + JSON.stringify(err));
                }
              });
            } else {
              this.usuarioService.update(usuario).subscribe({
                next: (usuarioAlterado) => {
                  this.router.navigateByUrl('/admin/usuarios');
                },
                error: (err) => {
                  console.log('Erro ao Editar' + JSON.stringify(err));
                }
              });
            }
          }
    }

    excluir(){
        if (this.formGroup.valid) {
            const usuario = this.formGroup.value;
            if (usuario.id != null) {
              this.usuarioService.delete(usuario).subscribe({
                next: () => {
                  this.router.navigateByUrl('/usuarios');
                },
                error: (err) => {
                  console.log('Erro ao Excluir' + JSON.stringify(err));
                }
              });
            }
          }
    }
}