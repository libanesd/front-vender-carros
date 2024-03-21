import { Carro } from "./carro.model";

export class Marca{
    id! : number;
    nome!: string;
    carros! : Carro[];

    constructor(id: number, nome: string, carros: Carro[]) {
        this.id = id;
        this.nome = nome;
        this.carros = carros;
    }

    static fromJSONArray(jsonArray: Marca[]): Marca[] {
        if (!jsonArray || !Array.isArray(jsonArray)) {
            throw new Error('Invalid JSON array format for Person');
        }

        return jsonArray.map(json => new Marca(json.id, json.nome, json.carros));
    }
}