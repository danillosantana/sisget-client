import { MesTO } from "../dto/mes.to";
import { MovimentacaoTO } from "../dto/movimentacao.to";

export class CaixaBean {
    constructor(
        public id? : number,
        public mes? : MesTO,
        public ano? : number,
        public movimentacoes? : Array<MovimentacaoTO>,
        public entradas? : number,
        public saidas? : number,
        public saldoAnterior? : number,
        public saldoFinal? : number
    ) {
    }
}