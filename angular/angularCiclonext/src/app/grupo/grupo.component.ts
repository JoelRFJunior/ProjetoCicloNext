import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Grupo } from '../model/Grupo';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { GrupoService } from '../service/grupo.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  nome = environment.nome
  foto = environment.urlImagemPerfil
  categoria = environment.categoria


  usuario: Usuario = new Usuario()
  idUsuario = environment.idUsuario


  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  grupo: Grupo = new Grupo()
  listaGrupo: Grupo[]
  idGrupo: number

  validaMensagem: boolean
  validaFoto: boolean
  validaTipo: boolean

  constructor(
    private router: Router,
    private grupoService: GrupoService,
    private postagemService: PostagemService,
    private authService: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {

    if (environment.token == '') {
      this.alertas.showAlertInfo('Sua sessão expirou, faça seu login novamente!')
      this.router.navigate(['/entrar'])
    }
    //this.grupo.criador = this.usuario
    //this.usuario.gruposCriados = this.listaGrupo
    //console.log(this.usuario)
    //console.log(this.usuario.gruposCriados)
    this.findAllGrupo()
    // this.getAllPostagens()
    this.findByIdUsuario()




    // this.findAllGrupo()
    }

  findAllGrupo() {
      // this.grupo = new Grupo()
    this.grupoService.getAllGrupo().subscribe((resp: Grupo[]) => {
      this.listaGrupo = resp
      
    })
  }

  findByIdGrupo() {
    this.grupoService.getByIdGrupo(this.idGrupo).subscribe((resp: Grupo) => {
      this.grupo = resp
    })
  }

  getAllPostagens() {
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
      console.log("Postagem"+ JSON.stringify( this.listaPostagens))
    })
  }

  findByIdUsuario() {
    
    this.postagemService.procurarUsuario(this.idUsuario).subscribe((resp: Usuario) => {
      this.usuario = resp

    })
  }

  //Metodo para cadastrar grupo
  cadastrar() {

    //this.grupo.idGrupo = this.idGrupo
    // this.postagem.grupo = this.grupo
    console.log(this.idUsuario)

    this.usuario.idUsuario = this.idUsuario
    this.grupo.criador = this.usuario
    console.log(this.usuario)
    this.grupoService.postGrupo(this.grupo).subscribe((resp: Grupo) => {
      this.grupo = resp
      //this.grupo.criador = this.usuario
      //this.usuario.gruposCriados = this.listaGrupo
      this.grupo = new Grupo()
      this.alertas.showAlertSuccess("Grupo cadastrado com sucesso!")
      this.findAllGrupo()
      this.getAllPostagens()
      this.findByIdUsuario()
    })
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




  // findUsuarioById(id: number) {
  // this.authService.getByIdUser(this.idUsuario).subscribe((resp: Usuario) => {
  //  this.usuario = resp

  //})
  // }

  //procurarGruposCriadosPeloUsuario(){
  //this.authService.getByIdUser(this.usuario.gruposCriados).subscribe((resp: Grupo[]))
  //}
}