import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupo } from 'src/app/model/Grupo';
import { GrupoService } from 'src/app/service/grupo.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-grupo-edit',
  templateUrl: './grupo-edit.component.html',
  styleUrls: ['./grupo-edit.component.css']
})
export class GrupoEditComponent implements OnInit {

  nome = environment.nome
  foto = environment.urlImagemPerfil

  grupo: Grupo = new Grupo()

  constructor(
    private grupoService: GrupoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdGrupo(id)
  }

  findByIdGrupo(id: number) {
    this.grupoService.getByIdGrupo(id).subscribe((resp: Grupo) => {
      this.grupo = resp
    })
  }

  atualizar() {
    this.grupoService.putGrupo(this.grupo).subscribe((resp: Grupo) => {
      this.grupo = resp
      alert('Grupo atualizado com sucesso.')
      this.router.navigate(['/grupo'])
    })
  }

}
