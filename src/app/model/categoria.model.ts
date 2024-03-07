import { Carro } from "./carro.model";
import { Oferta } from "./oferta.model";


export class Categoria {
    id! : number;
    nome! : string;
    carros! : Carro[];
    ofertas! : Oferta[];
    
}