import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Grupo } from '../model/Grupo';
import { GrupoService } from '../service/grupo.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  grupo: Grupo = new Grupo()
  listaGrupo: Grupo[]

  constructor(
    private router: Router,
    private grupoService: GrupoService
  ) { }

  ngOnInit() {

    if (environment.token == '') {
      alert('Sua sessão expirou, faça seu login novamente!')
      this.router.navigate(['/login'])

    }

    this.findAllGrupo()
  }

  findAllGrupo() {
    this.grupoService.getAllGrupo().subscribe((resp: Grupo[]) => {
      this.listaGrupo = resp
    })
  }

  cadastrar(){
    this.grupoService.postGrupo(this.grupo).subscribe((resp: Grupo)=>{
      this.grupo = resp
      alert("Grupo cadastrado com sucesso!")
      this.findAllGrupo()
      this.grupo = new Grupo()
    })
  }

}
