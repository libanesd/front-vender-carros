import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar-user/sidebar-user.component';

@Component({
  selector: 'app-user-template',
  standalone: true,
  imports: [NgIf,HeaderComponent,FooterComponent, RouterOutlet, MatButton, MatIcon,SidebarComponent],
  templateUrl: './user-template.component.html',
  styleUrl: './user-template.component.css'
})
export class UserTemplateComponent{
  isLoginRoute: boolean = false;

  constructor(private router: Router) {
    console.log("Passando no conttrutor do template de usuario")
    this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            if(this.router.url === '/login'){
              this.isLoginRoute = this.router.url === '/login';
              console.log(this.isLoginRoute);
            }
            if(this.router.url === '/sobre'){
              this.isLoginRoute = this.router.url === '/sobre';
              console.log(this.isLoginRoute);
            }
            if(this.router.url === '/recuperar-senha'){
              this.isLoginRoute = this.router.url === '/recuperar-senha';
              console.log(this.isLoginRoute);
            }
            if(this.router.url === '/trocar-de-senha'){
              this.isLoginRoute = this.router.url === '/trocar-de-senha';
              console.log(this.isLoginRoute);
            }
          }
      });
  }
}
