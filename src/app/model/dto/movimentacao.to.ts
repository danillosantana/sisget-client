import { TipoMovimentacaoTO } from "./tipo-movimentacao.to";
import { TipoOperacaoTO } from "./tipo-operacao.to";

export class  MovimentacaoTO {
    constructor(
        public id? : number,
        public descricao? : string,
        public tipoOperacao? : TipoOperacaoTO,
        public tipoMovimentacao ? : TipoMovimentacaoTO,
        public valor? : number,
        public indice? : number
    ) {

    }
}