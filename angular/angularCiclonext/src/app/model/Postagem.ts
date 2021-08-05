import { Usuario } from "./Usuario"
import { Grupo } from "./Grupo"

export class Postagem {
    public idPostagem: number
    public urlImagemVideo: string
    public corpo: string
    public tipoPostagem: string
    public data: Date
    public autor: Usuario
    public grupo: Grupo 
    }