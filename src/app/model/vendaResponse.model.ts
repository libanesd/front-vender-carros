import { Observable } from "rxjs";
import { Carro } from "./carro.model";
import { StatusVenda } from "./statusVenda.enum";
import { Usuario } from "./usuario.model";
import { UsuarioId } from "./usuarioId.model";
import { TipoDePagamento } from "./TipoDePagamento.enum";
import { TipoDeMovimentacaoFinanceira } from "./tipoDeMovimentacaoFinanceira.enum";

export class VendaResponse {
    id! : number;
    dataDeCompra! : Date;
    precoDaCompra! : number;
    descricao! : string;
    carro! : Carro;
    tipoDePagamento!: TipoDePagamento
    statusVenda! : StatusVenda; 
    usuario! : UsuarioId ;
    tipoMovimentacaoFinanceira!: TipoDeMovimentacaoFinanceira;

    constructor(dataDeCompra: Date,precoDaCompra: number,descricao: string,carro: Carro,tipoDePagamento: TipoDePagamento,
        statusVenda : StatusVenda, 
        usuario : UsuarioId, tipoMovimentacaoFinanceira: TipoDeMovimentacaoFinanceira ){
        this.dataDeCompra = dataDeCompra;
        this.precoDaCompra = precoDaCompra;
        this.descricao = descricao;
        this.carro = carro;
        this.tipoDePagamento = tipoDePagamento;
        this.statusVenda = statusVenda;
        this.usuario = usuario;
        this.tipoMovimentacaoFinanceira = tipoMovimentacaoFinanceira;
    }

    static fromJSONArray(jsonArray: VendaResponse[]): VendaResponse[] {
        if (!jsonArray || !Array.isArray(jsonArray)) {
            throw new Error('Invalid JSON array format for Person');
        }

        const usuarioJson = jsonArray.map(json => new VendaResponse(json.dataDeCompra,json.precoDaCompra,json.descricao,json.carro,json.tipoDePagamento,json.statusVenda,json.usuario,json.tipoMovimentacaoFinanceira));
        console.log(usuarioJson);

        return usuarioJson;
    }
}