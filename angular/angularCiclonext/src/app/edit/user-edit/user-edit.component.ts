import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioAtualizar } from 'src/app/model/UsuarioAtualizar';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: UsuarioAtualizar = new UsuarioAtualizar()
  confirmarSenha: string
  tipoUsuario: string

  nome = environment.nome
  foto = environment.urlImagemPerfil
  // token = environment.token
  // idUser = environment.idUsuario
  

  constructor(
    private authService: AuthService,
    private router: Router,
    private postagemService: PostagemService,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if (environment.token == '') {
     this.alertas.showAlertInfo('Sua sessão expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdUser(id)
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
    console.log(this.tipoUsuario)

  }

  findByIdUser(id: number){
    this.postagemService.procurarUsuario(id).subscribe((resp: UsuarioAtualizar) => {
      this.user = resp
    })
  }

  atualizar() {
    
    this.user.categoria = this.tipoUsuario
 
   
    //this.user.categoria = "USUARIO"
    //this.user.urlImagemPerfil = "123aaa"
    // this.user.email = "bruno@email.com"
   // this.user.nome = "Bruno Sequeira"
    //this.confirmarSenha = "123456"
    //this.user.senha = "123456"
    // this.user.idUsuario = 3
    if (this.confirmarSenha != this.user.senha) {
      this.alertas.showAlertDanger('As senhas estão incorretas.')
    } else {
      this.authService.alterar(this.user).subscribe((resp: UsuarioAtualizar) => {
        
       this.alertas.showAlertSuccess('Usuário atualizado com sucesso, faça o login novamente.')
        environment.token = ''
        environment.nome = ''
        environment.urlImagemPerfil = ''
        environment.idUsuario = 0
        this.router.navigate(['/entrar'])

      })
    }

  }



}
