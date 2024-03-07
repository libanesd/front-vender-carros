import { Carro } from "./carro.model";
import { Categoria } from "./categoria.model";
import { Usuario } from "./usuario.model";


export class Oferta{
    id! : number;
    nome! : string;
    carros! : Carro[];
    usuarios! : Usuario[];
    categorias! : Categoria[];
    porcentagemDeDesconto! : number;
}
