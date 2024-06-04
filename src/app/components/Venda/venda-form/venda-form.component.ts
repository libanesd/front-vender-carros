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
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { CarouselCaptionComponent,
  CarouselComponent,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  ThemeDirective } from '@coreui/angular';


@Component({
    selector: 'recuperar-senha-form',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,CarouselModule,
      ThemeDirective, CarouselComponent, CarouselIndicatorsComponent, CarouselInnerComponent, NgFor, CarouselItemComponent, CarouselCaptionComponent, CarouselControlComponent, RouterLink,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule,
      RouterModule],
    templateUrl: './venda-form.components.html',
    styleUrl: './venda-form.components.css'
  })
export class LogFormComponent implements OnInit{

    formGroup!: FormGroup;
    slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });

    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private snackBar: MatSnackBar) {}

        ngOnInit(): void {
          this.slides[0] = {
            id: 0,
            src: './assets/images/carros/carroRapido1.jpg',
            title: 'First slide',
            subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
          };
          this.slides[1] = {
            id: 1,
            src: './assets/images/carros/carroRapido2.jpg',
            title: 'Second slide',
            subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          };
          this.slides[2] = {
            id: 2,
            src: './assets/images/carros/carroRapido3.jpg',
            title: 'Third slide',
            subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
          };
        }
}