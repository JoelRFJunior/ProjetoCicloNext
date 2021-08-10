import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  nome = environment.nome
  foto = environment.urlImagemPerfil
  token = environment.token
  idUser = environment.idUsuario

  constructor(
    private router : Router,
    private auth: AuthService
  ) { }

  ngOnInit(){
  
    
  }

}
