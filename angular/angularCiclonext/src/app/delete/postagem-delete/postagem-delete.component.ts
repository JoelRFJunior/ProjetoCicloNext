import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { AlertasService } from 'src/app/service/alertas.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPostagem: number

  idUsuario = environment.idUsuario
  nome = environment.nome
  foto = environment.urlImagemPerfil
  token = environment.token
  categoria = environment.categoria


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private alertas: AlertasService
    ) { }

  ngOnInit(){

    window.scroll(0,0)

    if (environment.token == '') {
      this.alertas.showAlertInfo('Sua sessão expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }
    this.idPostagem = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPostagem)
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }


apagar(){
  this.postagemService.deletePostagem(this.idPostagem).subscribe(() => {
    this.alertas.showAlertSuccess('Postagem apagada com sucesso.')
    this.router.navigate(['/postagem'])

  })
}

}
