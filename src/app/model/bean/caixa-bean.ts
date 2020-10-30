import { MovimentacaoBean } from "src/app/components/caixa/movimentacao-caixa/movimentacao-caixa-form-builder";
import { MesTO } from "../dto/mes.to";

export class CaixaBean {
    constructor(
        public id? : number,
        public mes? : MesTO,
        public ano? : number,
        public movimentacoes? : Array<MovimentacaoBean>,
        public entradas? : number,
        public saidas? : number,
        public saldoAnterior? : number,
        public saldoFinal? : number
    ) {
    }
}