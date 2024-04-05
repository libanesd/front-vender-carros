import { Carro } from "./carro.model";
import { Oferta } from "./oferta.model";


export class Categoria {
    id! : number;
    nome! : string;
    carros! : Carro[];
    ofertas! : Oferta[];
    
    constructor(id: number, nome: string){
        this.id = id;
        this.nome = nome;
    }

    static fromJSONArray(jsonArray: Categoria[]): Categoria[] {
        if (!jsonArray || !Array.isArray(jsonArray)) {
            throw new Error('Invalid JSON array format for Person');
        }

        const CategoriaJson = jsonArray.map(json => new Categoria(json.id, json.nome));
        console.log(CategoriaJson);

        return CategoriaJson;
    }
}