import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupo } from 'src/app/model/Grupo';
import { AlertasService } from 'src/app/service/alertas.service';
import { GrupoService } from 'src/app/service/grupo.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-grupo-delete',
  templateUrl: './grupo-delete.component.html',
  styleUrls: ['./grupo-delete.component.css']
})
export class GrupoDeleteComponent implements OnInit {

  nome = environment.nome
  foto = environment.urlImagemPerfil

  grupo: Grupo = new Grupo()
  idGrupo: number

  constructor(
    private grupoService: GrupoService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.idGrupo = this.route.snapshot.params['id']
    this.findByIdGrupo(this.idGrupo)
  }

  findByIdGrupo(id:number){
    this.grupoService.getByIdGrupo(id).subscribe((resp: Grupo) => {
      this.grupo = resp
    })
  }

  apagar(){
    this.grupoService.deleteGrupo(this.idGrupo).subscribe(() => {
      this.alertas.showAlertSuccess('Grupo apagado com sucesso.')
      this.router.navigate(['/grupo'])
    })
  }

}
