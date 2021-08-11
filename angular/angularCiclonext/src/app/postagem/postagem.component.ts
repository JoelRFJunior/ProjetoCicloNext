import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { GrupoService } from '../service/grupo.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {

  nome = environment.nome
  foto = environment.urlImagemPerfil
  token = environment.token
  idUser = environment.idUsuario
   
  
  tipoPostagem: string
  user: Usuario = new Usuario
  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  user2: Usuario = new Usuario

  constructor(
    private router: Router,
    private authService: AuthService,
    private postagemService: PostagemService,
    private grupoService: GrupoService
    
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    console.log(this.token)
    console.log("token "+environment.token)
      if (environment.token == '') {
      //alert('Sua sessão expirou, faça o login novamente!')
      this.router.navigate(['/entrar'])

    }
   this.findUsuarioById()

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


  tipoDaPostagem(event: any) {
    this.tipoPostagem = event.target.value

  }

  findAllPostagem() {
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
      console.log("Postagem "+JSON.stringify( this.listaPostagens))
    })
  }

  postarNoFeed() {
    

    this.user.idUsuario = this.idUser
    this.postagem.autor = this.user
    

  //  this.user.idUsuario = Number(this.idUsuario)
  //  this.postagem.autor = this.user
     this.postagem.tipoPostagem = this.tipoPostagem
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem criada com sucesso')
      this.findAllPostagem()
      this.postagem = new Postagem()

    })

  }

  'cancelarPost'() {
    this.postagem = new Postagem()
  }





}
