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

  validaMail: boolean
  validaFoto: boolean
  validaTipo: boolean


  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    this.validaFoto = true

  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.categoria = event.target.value
    if (event.target.value != "") {
      this.validaTipo = true
    } else {
      this.validaTipo = false
    }


  }

  cadastrar() {
    this.user.categoria = this.categoria

    if (this.user.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger('As senhas estão incorretas.')
    } else {

      if (this.validaTipo && this.validaFoto && this.validaMail) {
        this.authService.cadastrar(this.user).subscribe((resp: Usuario) => {
          this.user = resp

          this.router.navigate(['/entrar'])
          this.alertas.showAlertSuccess('Usuário cadastrado com sucesso.')
        }, erro => {
          if (erro.status == 400) {
            this.alertas.showAlertDanger('Email ja cadastrado!')
          }
          if (erro.status == 500) {
            this.alertas.showAlertDanger('Preencha E-mail, Nome e Senha corretamente')
          }

        })
      } else {
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
  
  validaEmail(event: any) {
    let txtMail= document.querySelector('#txtMail') as HTMLInputElement;
           
    let emailOk = false
  
    //if (event.target.value.includes('.jpg') || event.target.value.includes('.jpeg') || event.target.value.includes('.png') ||  ) {
  
    if (event.target.value.includes('@') && event.target.value.includes('.') ){
  
      this.validaMail = true
      txtMail.innerHTML = ''
      txtMail.style.color = 'black'
       
    } else {
      this.validaMail = false
      txtMail.style.color = 'red'
      txtMail.innerHTML = 'Cuidado! Escreva o formato do email corretamente.' 
  
    }
  
  }
  



}
