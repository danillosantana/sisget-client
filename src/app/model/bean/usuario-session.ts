export class UsuarioSession {
    
    public id: number;
    public nome : string;
    public permissoes: Array<string>;
    public exp: number;
    public iat: number;
}