import { TipoDePagamento } from "./TipoDePagamento.enum";
import { TipoDeMovimentacaoFinanceira } from "./tipoDeMovimentacaoFinanceira.enum";

export class CompraUser{
    carro! : number;
    tipoDePagamento! : TipoDePagamento;
    tipoMovimentacaoFinanceira! : TipoDeMovimentacaoFinanceira;


    constructor(carro: number, tipoDePagamento: TipoDePagamento,tipoMovimentacaoFinanceira:TipoDeMovimentacaoFinanceira){
        this.carro = carro;
        this.tipoDePagamento = tipoDePagamento;
        this.tipoMovimentacaoFinanceira = tipoMovimentacaoFinanceira;
    }

    static fromJSONArray(jsonArray: CompraUser[]): CompraUser[] {
        if (!jsonArray || !Array.isArray(jsonArray)) {
            throw new Error('Invalid JSON array format for Person');
        }

        const usuarioJson = jsonArray.map(json => new CompraUser(json.carro, json.tipoDePagamento, json.tipoMovimentacaoFinanceira));
        console.log(usuarioJson);

        return usuarioJson;
    }
}