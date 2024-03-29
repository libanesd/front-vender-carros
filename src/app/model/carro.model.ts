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

    constructor(id: number, nome: string){
        this.id = id;
        this.nomeCarro = nome;
    }

    static fromJSONArray(jsonArray: Carro[]): Carro[] {
        if (!jsonArray || !Array.isArray(jsonArray)) {
            throw new Error('Invalid JSON array format for Person');
        }

        const carroJson = jsonArray.map(json => new Carro(json.id, json.nomeCarro));
        console.log(carroJson);

        return carroJson;
    }
}