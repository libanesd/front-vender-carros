import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenav } from '@angular/material/sidenav';
import { SidebarService } from '../../../../services/sidebar.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatList, MatListItem, MatNavList } from '@angular/material/list';
import { RouterModule, RouterOutlet } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CarrinhoService } from '../../../../services/carrinho.service';
import { Carro } from '../../../../model/carro.model';
import { VendaService } from '../../../../services/venda.service';
import { AuthService } from '../../../../services/auth.service';
import { Venda } from '../../../../model/venda.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenav, MatDrawer, MatDrawerContainer, RouterModule,TableModule, DialogModule, ButtonModule, HttpClientModule,
           MatDrawerContent, MatToolbar, MatList, MatNavList, MatListItem, RouterOutlet],
  templateUrl: './sidebar-user.component.html',
  styleUrl: './sidebar-user.component.css'
})
export class SidebarComponent implements OnInit {

  dialogVisible: boolean = false;
  carros!: Carro[];
  vendas!: Venda[];

  @ViewChild('drawer') public drawer!: MatDrawer;

  constructor(private sideBarService: SidebarService,
    private carrinhoService: CarrinhoService,
    private authService: AuthService,
    private vendaService: VendaService
  ) { }

  ngOnInit(): void {
    let nome = "";
    this.authService.getUsuarioLogado().forEach((usuario)=>{
      nome = usuario!.nome;
    })
    this.vendaService.findByNome(nome).subscribe({
      next: (resp) => {
        console.log(resp);
        this.vendas = resp;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.sideBarService.sideNavToggleSubject.subscribe(
      () => {
        if(this.drawer){
          this.drawer.toggle();
        }
      }
    )
  }
  showDialog() {
    this.dialogVisible = true;
  }
}