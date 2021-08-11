import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  user: Usuario = new Usuario
  confirmarSenha: string
  categoria: string



  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll  (0,0)

  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.categoria = event.target.value

  }

  cadastrar() {
    this.user.categoria = this.categoria

    if (this.user.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger('As senhas estão incorretas.')
    } else {
      this.router.navigate(['/entrar'])
      this.alertas.showAlertSuccess('Usuário cadastrado com sucesso.')
      this.authService.cadastrar(this.user).subscribe((resp: Usuario) => {
          this.user = resp
      })
    }
  }


}