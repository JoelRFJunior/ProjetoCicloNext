import { Grupo } from "./Grupo"
import { Postagem } from "./Postagem"

export class Usuario {
    public idUsuario: number
    public nome: string
    public senha: string
    public urlImagemPerfil: string
    public categoria: string
    public publicacoes: Postagem[]
    public email: string
    public gruposCriados: Grupo[] 
}