import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Grupo } from '../model/Grupo';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { GrupoService } from '../service/grupo.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-grupo-page',
  templateUrl: './grupo-page.component.html',
  styleUrls: ['./grupo-page.component.css']
})
export class GrupoPageComponent implements OnInit {
  nome = environment.nome
  foto = environment.urlImagemPerfil
  token = environment.token
  idUser = environment.idUsuario
  recebeImagem: string

  tipoPostagem: string
  user: Usuario = new Usuario
  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  user2: Usuario = new Usuario
  grupo: Grupo = new Grupo()

  key = 'data'
  reverse = true
  postagensGrupo: Postagem[];

idAux: number

  constructor(
    private router: Router,
    private authService: AuthService,
    private postagemService: PostagemService,
    private grupoService: GrupoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    window.scroll(0, 0)
      if (environment.token == '') {
      //alert('Sua sessão expirou, faça o login novamente!')
      this.router.navigate(['/entrar'])

  }

  let id = this.route.snapshot.params['id']
  this.idAux = id
  this.findByIdGrupo(id)
  //this.findAllPostagemGrupo()
  }

  findByIdGrupo(id: number){
    this.grupoService.getByIdGrupo(id).subscribe((resp: Grupo) => {
      this.grupo = resp
    })
  }


  findUsuarioById() {
    this.postagemService.procurarUsuario(this.idUser).subscribe((resp: Usuario) => {
      this.user = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: Usuario) => {
      this.user2 = resp
    })
  }

  recebeUmaImagem(event: any){
    this.recebeImagem = event.target.value
  }

  tipoDaPostagem(event: any) {
    this.tipoPostagem = event.target.value

  }

  findAllPostagem() {
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
      console.log("Postagem "+JSON.stringify( this.listaPostagens))
    })
  }

//findAllPostagemGrupo(){

//}

  postarNoFeedGrupo() {
    this.user.idUsuario = this.idUser
    this.postagem.autor = this.user
    this.postagem.grupo = this.grupo
    this.postagem.tipoPostagem = this.tipoPostagem
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem criada com sucesso')

      this.findAllPostagem()
      this.postagem = new Postagem()

      this.grupo = new Grupo()
      this.findByIdGrupo(this.idAux)

    })

  }

  'cancelarPost'() {
    this.postagem = new Postagem()
  }

  tipoDeFiltro(event: any) {
    
    if (event.target.value == '') {
      this.findAllPostagem()
    } else {
      this.postagemService.getByTipoPostagem(event.target.value).subscribe((resp: Postagem[]) => {
        this.listaPostagens = resp

      })
    }
  }

}





