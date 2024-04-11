import { Routes } from '@angular/router';
import { CarroListComponent } from './components/Carro/carro-list/carro-list.component';
import { CarroFormComponent } from './components/Carro/carro-form/carro-form.component';
import { CarroResolver } from './components/Carro/resolver/carro-resolver';
import { MarcaListComponent } from './components/Marca/marca-list/marca-list.component';
import { MarcaFormComponent } from './components/Marca/marca-form/marca-form.component';
import { MarcaResolver } from './components/Marca/resolver/marca-resolver';
import { CategoriaListComponent } from './components/Categoria/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './components/Categoria/categoria-form/categoria-form.component';
import { CategoriaResolver } from './components/Categoria/resolver/categoria-resolver';
import { OfertaListComponent } from './components/Oferta/oferta-list/oferta-list.component';
import { OfertaFormComponent } from './components/Oferta/oferta-form/oferta-form.component';
import { OfertaResolver } from './components/Oferta/resolver/oferta-resolver';
import { UsuarioListComponent } from './components/Usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './components/Usuario/usuario-form/usuario-form.component';
import { UsuarioResolver } from './components/Usuario/resolver/usuario-resolver';
import { LoginFormComponent } from './components/Auth/login/login-form.component';
import { CadastroFormComponent } from './components/Auth/cadastro/cadastro-form.component';
import { ProdutosListComponent } from './components/Home/produtos-list/produtos-list.component';

export const routes: Routes = [
    { path: 'carros', component: CarroListComponent, title: 'Lista de Carros'},
    { path: 'carros/new', component: CarroFormComponent, title: 'Novo Carro'},
    { path: 'carros/edit/:id', component: CarroFormComponent, resolve: {Carro: CarroResolver}},

    { path: 'categorias', component: CategoriaListComponent, title: 'Lista de categorias'},
    { path: 'categorias/new', component: CategoriaFormComponent, title: 'Nova categoria'},
    { path: 'categorias/edit/:id', component: CategoriaFormComponent, resolve: {categoria: CategoriaResolver}},

    { path: 'marcas', component: MarcaListComponent, title: 'Lista de marcas'},
    { path: 'marcas/new', component: MarcaFormComponent, title: 'Nova marca'},
    { path: 'marcas/edit/:id', component: MarcaFormComponent, resolve: {Marca: MarcaResolver}},

    { path: 'ofertas', component: OfertaListComponent, title: 'Lista de Ofertas'},
    { path: 'ofertas/new', component: OfertaFormComponent, title: 'Nova oferta'},
    { path: 'ofertas/edit/:id', component: OfertaFormComponent, resolve: {Oferta: OfertaResolver}},

    { path: 'usuarios', component: UsuarioListComponent, title: 'Lista de Ofertas'},
    { path: 'usuarios/new', component: UsuarioFormComponent, title: 'Novo usuario'},
    { path: 'usuarios/edit/:id', component: UsuarioFormComponent, resolve: {Usuario: UsuarioResolver}},

    { path: 'login', component: LoginFormComponent, title: 'Login'},
    { path: 'cadastro', component: CadastroFormComponent, title: 'Cadastro'},
    { path: 'produtos', component: ProdutosListComponent, title: 'Lista de Produtos'},
];