import { Carro } from "./carro.model";

export class Venda {
    id! : number;
    dataDeCompra! : Date;
    precoDaCompra! : number;
    descricao! : string;
    carro! : Carro; 
}