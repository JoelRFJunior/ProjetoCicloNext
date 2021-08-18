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
  user2: Usuario = new Usuario()

  nome = environment.nome
  foto = environment.urlImagemPerfil
  categoria = environment.categoria

  // token = environment.token
  // idUser = environment.idUsuario
  
  validaFoto: boolean
  validaTipo: boolean

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
    this.validaFoto = true
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
    if(event.target.value != ""){
      this.validaTipo = true
    } else {
      this.validaTipo = false
    }

  }

  findByIdUser(id: number){
    this.postagemService.procurarUsuario(id).subscribe((resp: Usuario) => {
      this.user2 = resp
    })
  }

  atualizar() {
    
    this.user2.categoria = this.tipoUsuario
    this.user.idUsuario = this.user2.idUsuario
    this.user.categoria = this.user2.categoria
    this.user.email = this.user2.email
    this.user.nome = this.user2.nome
    this.user.senha = this.user2.senha
    this.user.urlImagemPerfil = this.user2.urlImagemPerfil
    
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
      if (this.validaFoto && this.validaTipo) {

      this.authService.alterar(this.user).subscribe((resp: UsuarioAtualizar) => {
        
       this.alertas.showAlertSuccess('Usuário atualizado com sucesso, faça o login novamente.')
        environment.token = ''
        environment.nome = ''
        environment.urlImagemPerfil = ''
        environment.idUsuario = 0
        this.router.navigate(['/entrar'])

      })
    }else{
      this.alertas.showAlertInfo('Por favor, preencha os campos corretamente.')
    }
  
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
