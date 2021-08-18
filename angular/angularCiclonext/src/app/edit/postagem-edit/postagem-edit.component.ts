import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupo } from 'src/app/model/Grupo';
import { Postagem } from 'src/app/model/Postagem';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { GrupoService } from 'src/app/service/grupo.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUsuario = environment.idUsuario
  nome = environment.nome
  foto = environment.urlImagemPerfil
  token = environment.token
  categoria = environment.categoria



  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tipoPostagem: string
  idPostagem: number


  grupo: Grupo = new Grupo()
  listaGrupos: Grupo[]
  idGrupo: number


  validaMensagem: boolean
  validaFoto: boolean
  validaTipo: boolean

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private grupoService: GrupoService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    if (environment.token == '') {
      this.alertas.showAlertInfo('Sua sessão expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }
    let id = this.route.snapshot.params['id']
    this.idPostagem = id
    this.findByIdPostagem(this.idPostagem)
    this.validaFoto = true
    this.validaMensagem = true


  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  findByIdGrupo() {
    this.grupoService.getByIdGrupo(this.idGrupo).subscribe((resp: Grupo) => {
      this.grupo = resp
    })
  }

  findAllGrupos() {
    this.grupoService.getAllGrupo().subscribe((resp: Grupo[]) => {
      this.listaGrupos = resp
    })
  }


  tipoDaPostagem(event: any) {
    this.tipoPostagem = event.target.value
    if(event.target.value != ""){
      this.validaTipo = true
    } else {
      this.validaTipo = false
    }

  }

  atualizar() {
    // this.postagem.idPostagem = this.idPostagem
    //  this.postagem.grupo = this.grupo
    this.postagem.tipoPostagem = this.tipoPostagem
    // this.usuario.idUsuario = this.idUsuario
    //   this.postagem.autor = this.usuario
    // console.log(this.postagem.autor.idUsuario)
    if (this.validaFoto && this.validaMensagem && this.validaTipo) {
    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem atualizada com sucesso.')
      this.router.navigate(['/postagem'])
    })
  } else {
    this.alertas.showAlertInfo('Por favor, preencha os campos corretamente.')

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


}
