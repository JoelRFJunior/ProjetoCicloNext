

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  nome =environment.nome
  foto = environment.urlImagemPerfil
  token = environment.token
   
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    console.log(this.token)


    if(environment.token == ''){
      //alert('Sua sessão expirou, faça o login novamente!')
      this.router.navigate(['/entrar'])
      
      }
  }

  

}
