import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(
    private http: HttpClient
  ) {}

  token = {
    headers: new HttpHeaders().set('Authorization',"Basic d2VuZGV3QGNpY2xvbmV4dC5jb206MTIzNDU2")
  }

  getAllPostagem(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>('https://ciclonext.herokuapp.com/api/v1/postagem/getAll', this.token)
    
  }

  postPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>('https://ciclonext.herokuapp.com/api/v1/postagem', postagem, this.token)
  }

  procurarUsuario(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`https://ciclonext.herokuapp.com/api/v1/usuario/${id}`, this.token)
  
  }

}
