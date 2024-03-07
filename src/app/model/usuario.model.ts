import { Venda } from "./venda.model";
import { Oferta } from "./oferta.model";

export class Usuario{
    id! : number;
    nome! : string;
    login! : string;
    senha! : string;
    cpf! : string;
    endereco! : string;
    telefone! : string;
    email! : string;
    ofertas ! : Oferta[];
    vendas! : Venda[];
}