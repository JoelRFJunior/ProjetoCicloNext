import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Grupo } from '../model/Grupo';
import { Postagem } from '../model/Postagem';


@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(
    private http: HttpClient
  ) { }

    
  token = {
    headers: new HttpHeaders().set('Authorization', 'Basic amFtaWx5bWVsbzc4N0BnbWFpbC5jb206MTIz')
  }

    //  token = {
    //   headers: new HttpHeaders().set('Authorization', environment.token)
    // }

  getAllGrupo(): Observable<Grupo[]>{
    return this.http.get<Grupo[]>('https://ciclonext.herokuapp.com/api/v1/grupo/getAll', this.token)

  }

  getByIdGrupo(id: number): Observable<Grupo>{
    return this.http.get<Grupo>(`https://ciclonext.herokuapp.com/api/v1/grupo/${id}`, this.token)

  }

  postGrupo(grupo: Grupo): Observable<Grupo>{
    return this.http.post<Grupo>('https://ciclonext.herokuapp.com/api/v1/grupo', grupo, this.token)
  }

  putGrupo(grupo: Grupo): Observable<Grupo>{
    return this.http.put<Grupo>('https://ciclonext.herokuapp.com/api/v1/grupo', grupo, this.token)
  }

  deleteGrupo(id: number){
    return this.http.delete(`https://ciclonext.herokuapp.com/api/v1/grupo/${id}`, this.token)
  }

//  getAllGrupo(): Observable<Grupo[]>{

//        return this.http.get<Grupo[]>('http://localhost:8080/api/v1/grupo/getAll', this.token)
//   }

//   getByIdGrupo(id: number): Observable<Grupo>{
//     return this.http.get<Grupo>(`http://localhost:8080/api/v1/grupo/${id}`, this.token)

//   }

//   postGrupo(grupo: Grupo): Observable<Grupo>{
//     return this.http.post<Grupo>('http://localhost:8080/api/v1/grupo', grupo, this.token)
//   }

//   putGrupo(grupo: Grupo): Observable<Grupo>{
//     return this.http.put<Grupo>('http://localhost:8080/api/v1/grupo', grupo, this.token)
//   }

//   deleteGrupo(id: number){
//     return this.http.delete(`http://localhost:8080/api/v1/grupo/${id}`, this.token)
//   }


  //http://localhost:8080/usuario/
}

