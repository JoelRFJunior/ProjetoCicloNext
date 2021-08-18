

import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { GrupoService } from '../service/grupo.service';
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
  idUser = environment.idUsuario
  categoria = environment.categoria

  recebeImagem: string

  tipoPostagem: string
  user: Usuario = new Usuario
  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  user2: Usuario = new Usuario

  key = 'data'
  reverse = true

  validaMensagem: boolean
  validaFoto: boolean
  validaTipo: boolean


  constructor(
    private router: Router,
    private authService: AuthService,
    private postagemService: PostagemService,
    private grupoService: GrupoService,
    private alertas: AlertasService

  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    console.log("categoria"+environment.categoria)
    console.log("token " + environment.token)
    if (environment.token == '') {
      //alert('Sua sessão expirou, faça o login novamente!')
      this.router.navigate(['/entrar'])

    }
    this.findAllPostagem()
    this.validaFoto = true
    // this.findUsuarioById()

  }
  findUsuarioById() {
    this.postagemService.procurarUsuario(this.idUser).subscribe((resp: Usuario) => {
      this.user = resp
    })
  }

  findByIdUser() {
    this.authService.getByIdUser(this.idUser).subscribe((resp: Usuario) => {
      this.user2 = resp
    })
  }

  recebeUmaImagem(event: any) {
    this.recebeImagem = event.target.value
  }

  tipoDaPostagem(event: any) {
    this.tipoPostagem = event.target.value
    if(event.target.value != ""){
      this.validaTipo = true
    } else {
      this.validaTipo = false
    }

  }

  findAllPostagem() {
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
      //console.log("Postagem " + JSON.stringify(this.listaPostagens))
    })
  }

  postarNoFeed() {


    this.user.idUsuario = this.idUser
    this.postagem.autor = this.user
    this.postagem.tipoPostagem = this.tipoPostagem
    //  this.user.idUsuario = Number(this.idUsuario)
    //  this.postagem.autor = this.user
  

    if (this.validaFoto && this.validaMensagem && this.validaTipo) {
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem criada com sucesso')
      this.findAllPostagem()
      this.postagem = new Postagem()
      this.validaTipo = false
      this.validaMensagem = false
      let txtAssunto= document.querySelector('#txtAssunto') as HTMLInputElement;
      txtAssunto.innerHTML = ''
      let selectTipoPostagem = document.querySelector('#tipoDaPostagem') as HTMLOptionElement;
      selectTipoPostagem.value = ''
      
    })
  } else {
    this.alertas.showAlertInfo('Por favor, preencha os campos corretamente.')

  }


  }

  'cancelarPost'() {
    this.postagem = new Postagem()
    let txtAssunto= document.querySelector('#txtAssunto') as HTMLInputElement;
    txtAssunto.innerHTML = 500 +'/500'   
    txtAssunto.style.color = 'black'
      
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

  validaAssunto(event: any) {
    let txtAssunto= document.querySelector('#txtAssunto') as HTMLInputElement;
    let valor: Number;

    valor = 500 - event.target.value.length
         

    if (event.target.value.length >=500 || event.target.value.length<1) {
      this.validaMensagem = false
        txtAssunto.style.color = 'red'
        txtAssunto.innerHTML = valor +'/500 Cuidado! verifique a quantidade de caracteres da sua mensagem.' 

    } else {
      this.validaMensagem = true
      txtAssunto.innerHTML = valor +'/500'
      txtAssunto.style.color = 'black'

    }

}

validaImagem(event: any) {
  let txtImagem= document.querySelector('#txtImagem') as HTMLInputElement;
         
  let emailOk = false

  //if (event.target.value.includes('.jpg') || event.target.value.includes('.jpeg') || event.target.value.includes('.png') ||  ) {

  if (event.target.value.length<=500 ){

    this.validaFoto = true
    txtImagem.innerHTML = ''
    txtImagem.style.color = 'black'
     
  } else {
    this.validaFoto = false
    txtImagem.style.color = 'red'
    txtImagem.innerHTML = 'Cuidado! link da imagem acima de 500 caracteres.' 

  }

}



  // filtrar() {
  //   if (this.tipoPostagem == '') {
  //     this.findAllPostagem()
  //   } else {
  //     this.postagemService.getByTipoPostagem(this.tipoPostagem).subscribe((resp: Postagem[]) => {
  //       this.listaPostagens = resp
  //     })
  //   } 
  // }
}

