import { Observable } from "rxjs";
import { Carro } from "./carro.model";
import { StatusVenda } from "./statusVenda.enum";
import { Usuario } from "./usuario.model";
import { UsuarioId } from "./usuarioId.model";

export class Venda {
    id! : number;
    dataDeCompra! : Date;
    precoDaCompra! : number;
    descricao! : string;
    carro! : Carro;
    statusVenda! : StatusVenda; 
    usuario! : UsuarioId ;

    constructor(dataDeCompra: Date,precoDaCompra: number,descricao: string,carro: Carro,statusVenda : StatusVenda, 
        usuario : UsuarioId ){
        this.dataDeCompra = dataDeCompra;
        this.precoDaCompra = precoDaCompra;
        this.descricao = descricao;
        this.carro = carro;
        this.usuario = usuario;
    }

    static fromJSONArray(jsonArray: Venda[]): Venda[] {
        if (!jsonArray || !Array.isArray(jsonArray)) {
            throw new Error('Invalid JSON array format for Person');
        }

        const usuarioJson = jsonArray.map(json => new Venda(json.dataDeCompra,json.precoDaCompra,json.descricao,json.carro,json.statusVenda,json.usuario));
        console.log(usuarioJson);

        return usuarioJson;
    }
}