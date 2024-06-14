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


    constructor(id: number, nome: string){
        this.id = id;
        this.nome = nome;
    }

    static fromJSONArray(jsonArray: Usuario[]): Usuario[] {
        if (!jsonArray || !Array.isArray(jsonArray)) {
            throw new Error('Invalid JSON array format for Person');
        }

        const usuarioJson = jsonArray.map(json => new Usuario(json.id, json.nome));
        console.log(usuarioJson);

        return usuarioJson;
    }
}