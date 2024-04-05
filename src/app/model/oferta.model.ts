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

    constructor(id: number, nome: string, carros: Carro[]) {
        this.id = id;
        this.nome = nome;
        this.carros = carros;
    }

    static fromJSONArray(jsonArray: Oferta[]): Oferta[] {
        if (!jsonArray || !Array.isArray(jsonArray)) {
            throw new Error('Invalid JSON array format for Person');
        }

        const marcaJson = jsonArray.map(json => new Oferta(json.id, json.nome, json.carros));
        console.log(marcaJson);

        return marcaJson;
    }
}
