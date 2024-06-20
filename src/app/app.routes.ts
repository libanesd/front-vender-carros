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
import { CarrinhoListComponent } from './components/Carrinho/carrinho-list/carrinho-list.component';
import { UserTemplateComponent } from './components/template/user-template/user-template.component';
import { AdminTemplateComponent } from './components/template/admin-template/admin-template.component';
import { RecuperarSenhaFormComponent } from './components/Auth/recuperar-senha/recuperar-senha-form.component';
import { LogFormComponent } from './components/Home/home-list/home-list.component';
import { DetalheDoProdutoFormComponent } from './components/Detalhes-Do-Produto/detalhe-do-produto-form/detalhe-do-produto-form.component';
import { AdministrarPerfilFormComponent } from './components/Administrar-Perfil/administrar-perfil/administrar-perfil-form.component';
import { SobreFormComponent } from './components/Sobre/sobre-form/sobre-form.component';
import { TrocarSenhaFormComponent } from './components/Auth/trocar-senha/trocar-senha-form.component';
import { CarroInserirImagemFormComponent } from './components/Carro/carro-inserir-imagem-form/carro-inserir-imagem-form.component';
import { authGuard } from './guard/auth.guard';
import { MeuPerfilFormComponent } from './components/Meu-perfil/meu-perfil-form.component';
import { AlterarDadosUsuarioLogadoFormComponent } from './components/Alterar-dados-usuario-logado/alterar-dados-usuario-logado-form.component';

export const routes: Routes = [
    { 
        path: '', 
        component: UserTemplateComponent, 
        title: 'e-commerce',
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'login'},

            { path: 'cadastro', component: CadastroFormComponent, title: 'Cadastro'},
            { path: 'meu-perfil', component: MeuPerfilFormComponent, title: 'Meu Perfil'},
            { path: 'alterar-dados', component: AlterarDadosUsuarioLogadoFormComponent, title: 'Dados Pessoais'},
            { path: 'login', component: LoginFormComponent, title: 'Login'},

            { path: 'home', component: LogFormComponent, title: 'Home'},
            { path: 'produtos', component: ProdutosListComponent, title: 'Lista de Produtos'},
            { path: 'carrinho', component: CarrinhoListComponent, title: 'Carrinho'},
            { path: 'recuperar-senha', component: RecuperarSenhaFormComponent, title: 'Recuperar Senha'},
            { path: 'trocar-de-senha', component: TrocarSenhaFormComponent, title: 'Trocar Senha'},
            { path: 'detalhe-do-produto', component: DetalheDoProdutoFormComponent, title: 'Detalhe do protudo'},
            { path: 'administrar-perfil', component: AdministrarPerfilFormComponent, title: 'Administrar Perfil'},
            { path: 'sobre', component: SobreFormComponent, title: 'Sobre'},

        ]

    },
    { 
        path: 'admin', 
        component: AdminTemplateComponent, 
        title: 'e-commerce',
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'login'},

            { path: 'recuperar-senha', component: RecuperarSenhaFormComponent, title: 'Recuperar Senha'},
        
            { path: 'carros', component: CarroListComponent, title: 'Lista de Carros',canActivate: [authGuard]},
            { path: 'carros/new', component: CarroFormComponent, title: 'Novo Carro',canActivate: [authGuard]},
            { path: 'carros/carro-inserir-imagem', component: CarroInserirImagemFormComponent, title: 'Nova imagem',canActivate: [authGuard]},
            { path: 'carros/edit/:id', component: CarroFormComponent, resolve: {carro: CarroResolver}},

            { path: 'categorias', component: CategoriaListComponent, title: 'Lista de categorias',canActivate: [authGuard]},
            { path: 'categorias/new', component: CategoriaFormComponent, title: 'Nova categoria',canActivate: [authGuard]},
            { path: 'categorias/edit/:id', component: CategoriaFormComponent, resolve: {categoria: CategoriaResolver}},

            { path: 'marcas', component: MarcaListComponent, title: 'Lista de marcas',canActivate: [authGuard]},
            { path: 'marcas/new', component: MarcaFormComponent, title: 'Nova marca',canActivate: [authGuard]},
            { path: 'marcas/edit/:id', component: MarcaFormComponent, resolve: {marca: MarcaResolver}},

            { path: 'ofertas', component: OfertaListComponent, title: 'Lista de Ofertas',canActivate: [authGuard]},
            { path: 'ofertas/new', component: OfertaFormComponent, title: 'Nova oferta',canActivate: [authGuard]},
            { path: 'ofertas/edit/:id', component: OfertaFormComponent, resolve: {oferta: OfertaResolver}},

            { path: 'usuarios', component: UsuarioListComponent, title: 'Lista de Ofertas',canActivate: [authGuard]},
            { path: 'usuarios/new', component: UsuarioFormComponent, title: 'Novo usuario',canActivate: [authGuard]},
            { path: 'usuarios/edit/:id', component: UsuarioFormComponent, resolve: {usuario: UsuarioResolver}},
        ]

    }
];