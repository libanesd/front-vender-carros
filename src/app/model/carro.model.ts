import { Venda } from "./venda.model";
import { Marca } from "./marca.model";
import { Categoria } from "./categoria.model";
import { Oferta } from "./oferta.model";

export class Carro {
    id! : number;
    nomeImagem! : string;
    nomeCarro! : string;
    carroSpec! : string;
    versao! : string;
    ano! : string;
    cor! : string;
    caracteristicas! : string;
    cidade! : string;
    preco! : number;
    kilometragem! : number;
    estoque! : number;
    venda! : Venda;
    marca! : Marca;
    categorias! : Categoria[];
    ofertas! : Oferta[];
}