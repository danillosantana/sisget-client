export class UsuarioSenhaBean {

    public id : number;
    public novaSenha : string;
    public confirmacaoSenha : string;

    constructor(id : number, novaSenha : string, confirmacaoSenha : string) {
        this.id = id;
        this.novaSenha = novaSenha;
        this.confirmacaoSenha = confirmacaoSenha;
    }
}