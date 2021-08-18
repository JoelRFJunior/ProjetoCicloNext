import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupo } from 'src/app/model/Grupo';
import { GrupoParaAtualizar } from 'src/app/model/GrupoParaAtualizar';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { GrupoService } from 'src/app/service/grupo.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-grupo-edit',
  templateUrl: './grupo-edit.component.html',
  styleUrls: ['./grupo-edit.component.css']
})
export class GrupoEditComponent implements OnInit {

  nome = environment.nome
  foto = environment.urlImagemPerfil
  iduser = environment.idUsuario
  categoria = environment.categoria


  user: Usuario = new Usuario()
  grupo: Grupo = new Grupo()
  grupoAtualizar: GrupoParaAtualizar = new GrupoParaAtualizar()

  validaMensagem: boolean
  validaFoto: boolean
  validaTipo: boolean


  constructor(
    private grupoService: GrupoService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdGrupo(id)
  }

  findByIdGrupo(id: number) {
    this.grupoService.getByIdGrupo(id).subscribe((resp: Grupo) => {
      this.grupo = resp
    })
  }

  atualizar() {
    console.log(JSON.stringify(this.grupo))
    this.user.idUsuario = this.iduser
    this.grupoAtualizar.criador = this.user

    this.grupoAtualizar.idGrupo = this.grupo.idGrupo
    this.grupoAtualizar.nomeGrupo = this.grupo.nomeGrupo
    this.grupoAtualizar.urlImagemGrupo = this.grupo.urlImagemGrupo
    this.grupoAtualizar.descricao = this.grupo.descricao
    this.grupoService.putGrupo(this.grupoAtualizar).subscribe((resp: GrupoParaAtualizar) => {
      this.grupoAtualizar = resp
      this.alertas.showAlertSuccess('Grupo atualizado com sucesso.')
      this.router.navigate(['/grupo'])
    })
  }


  validaImagem(event: any) {
    let txtImagem = document.querySelector('#txtImagem') as HTMLInputElement;

    let emailOk = false

    //if (event.target.value.includes('.jpg') || event.target.value.includes('.jpeg') || event.target.value.includes('.png') ||  ) {

    if (event.target.value.length <= 500) {

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
