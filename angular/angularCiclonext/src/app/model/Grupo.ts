import { Postagem } from "./Postagem"
import { Usuario } from "./Usuario"

export class Grupo {
public idGrupo: number
public nomeGrupo: string
public descricao: string
public urlImagemGrupo: string
public postagens: Postagem[]
public criador: Usuario
}