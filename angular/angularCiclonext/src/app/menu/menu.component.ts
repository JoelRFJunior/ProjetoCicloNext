import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
   
  idUser = environment.idUsuario


  constructor(
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit(){

  }

  sair(){
    
    this.alertas.showAlertInfo('Usuario deslogado')

    environment.token = ''
    environment.idUsuario=0
    environment.nome = ''
    environment.urlImagemPerfil = ''
    this.router.navigate(['/entrar'])

    

  }

}
