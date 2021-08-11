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

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tipoPostagem: string
  idPostagem: number


  grupo: Grupo = new Grupo()
  listaGrupos: Grupo[]
  idGrupo: number

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
    // this.findAllGrupos()

    console.log(this.idPostagem)

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

  }

  atualizar() {
    // this.postagem.idPostagem = this.idPostagem
    //  this.postagem.grupo = this.grupo
    this.postagem.tipoPostagem = this.tipoPostagem
    // this.usuario.idUsuario = this.idUsuario
    //   this.postagem.autor = this.usuario



    // console.log(this.postagem.autor.idUsuario)

    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem atualizada com sucesso.')
      this.router.navigate(['/postagem'])
    })

  }


}
