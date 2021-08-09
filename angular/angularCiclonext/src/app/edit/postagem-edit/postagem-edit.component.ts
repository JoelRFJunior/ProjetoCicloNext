import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupo } from 'src/app/model/Grupo';
import { Postagem } from 'src/app/model/Postagem';
import { GrupoService } from 'src/app/service/grupo.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {
  postagem: Postagem = new Postagem()

  grupo: Grupo = new Grupo()
  listaGrupos: Grupo[]
  idGrupo: number
  tipoPostagem: string 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private grupoService: GrupoService
  ) { }

  ngOnInit(){

    window.scroll(0,0)

    if (environment.token == '') {
      alert('Sua sessão expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }
    let id = this.route.snapshot.params['id']
    this.findByIdPostagem(id)
    this.findAllGrupos()
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  findByIdGrupo(){
    this.grupoService.getByIdGrupo(this.idGrupo).subscribe((resp: Grupo) => {
      this.grupo = resp
    })
  }

  findAllGrupos(){
    this.grupoService.getAllGrupo().subscribe((resp: Grupo[]) => {
      this.listaGrupos = resp
    })
  }


  tipoDaPostagem(event: any) {
    this.tipoPostagem = event.target.value

  }

atualizar(){
  this.grupo.idGrupo = this.idGrupo
  this.postagem.grupo = this.grupo
  this.postagem.tipoPostagem = this.tipoPostagem

  this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
    this.postagem = resp
    alert('Postagem atualizada com sucesso.')
    this.router.navigate(['/home'])
  })

}


}
