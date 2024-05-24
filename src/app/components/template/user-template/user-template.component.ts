import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-template',
  standalone: true,
  imports: [NgIf,HeaderComponent,FooterComponent, RouterOutlet, MatButton, MatIcon],
  templateUrl: './user-template.component.html',
  styleUrl: './user-template.component.css'
})
export class UserTemplateComponent{
  isLoginRoute: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
              this.isLoginRoute = this.router.url === '/login';
              console.log(this.isLoginRoute);
          }
      });
  }
}
