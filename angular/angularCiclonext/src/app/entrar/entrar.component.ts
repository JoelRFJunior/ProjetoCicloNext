import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLoginDTO } from '../model/UsuarioLoginDTO';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UsuarioLoginDTO = new UsuarioLoginDTO()



  constructor(
    private auth: AuthService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0, 0)
   
  }

  entrar() {
    this.auth.entrar(this.userLogin).subscribe((resp: UsuarioLoginDTO) => {
     
     
      this.userLogin = resp

      console.log('antes de entrar : ' + environment.token)
      
      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.urlImagemPerfil = this.userLogin.urlImagemPerfil
      environment.idUsuario = this.userLogin.idUsuario
     
      localStorage.setItem('token',this.userLogin.token)
      console.log('ao entrar : ' + environment.token)
      console.log(environment.nome)

      this.router.navigate(['/home'])

    }, erro => {
      if (erro.status == 500) {
        alert('Usuario ou senha Inválidos!')
      }
    })
  }
}