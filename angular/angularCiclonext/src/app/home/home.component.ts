

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { PostagemService } from '../service/postagem.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nome = environment.nome
  foto = environment.urlImagemPerfil
  token = environment.token
  idUsuario = environment.idUsuario

  tipoPostagem: string
  user: Usuario = new Usuario
  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  constructor(
    private router: Router,
    private postagemService: PostagemService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    console.log(this.token)
console.log("token "+environment.token)
    let id = this.idUsuario

    this.findAllPostagem()

    if (environment.token == '') {
      //alert('Sua sessão expirou, faça o login novamente!')
      this.router.navigate(['/entrar'])

    }
  }
  findUsuarioById(id: number) {
    this.postagemService.procurarUsuario(id).subscribe((resp: Usuario) => {
      this.user = resp
    })
  }

  tipoDaPostagem(event: any) {
    this.tipoPostagem = event.target.value

  }

  findAllPostagem() {
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  postarNoFeed() {
    this.findUsuarioById(this.idUsuario)
    console.log(this.user)
    console.log(this.tipoPostagem)
    console.log(this.postagem)
    console.log(this.token)


    //this.postagem.autor = this.user.idUsuario
    // this.postagem.tipoPostagem = this.tipoPostagem
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem criada com sucesso')
      this.findAllPostagem()
      this.postagem = new Postagem()

    })

  }

  'cancelarPost'() {
    this.postagem = new Postagem
  }




}
