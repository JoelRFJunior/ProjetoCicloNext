import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Postagem } from "../model/Postagem";
import { Usuario } from "../model/Usuario";


@Injectable({
  providedIn: 'root'
})
export class PostagemService {  

  constructor(private http: HttpClient) {}


  // token = {
  //   headers: new HttpHeaders().set('Authorization', 'Basic b2RpbkBjaWNsb25leHQuY29tOm9kaW4xMjM0')
  // }
  
   token = {
     headers: new HttpHeaders().set('Authorization', 'Basic amFtaWx5bWVsbzc4N0BnbWFpbC5jb206MTIz')
  }


  getAllPostagem(): Observable<Postagem[]> {
   
    return this.http.get<Postagem[]>('https://ciclonext.herokuapp.com/api/v1/postagem/getAll'
    // , this.token
    )
    
  }

  postPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>('https://ciclonext.herokuapp.com/api/v1/postagem', postagem
    // ,     this.token
    )
  }

  procurarUsuario(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`https://ciclonext.herokuapp.com/api/v1/usuario/${id}`
    // ,     this.token
    )
  
  }

  getByIdPostagem(id: number): Observable<Postagem>{
    return this.http.get<Postagem>(`https://ciclonext.herokuapp.com/api/v1/postagem/${id}`
    // ,     this.token
    )
  }

  putPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.put<Postagem>('https://ciclonext.herokuapp.com/api/v1/postagem', postagem
    // ,  this.token
    )
  }

  deletePostagem(id: number){
    return this.http.delete(`https://ciclonext.herokuapp.com/api/v1/postagem/${id}`
        //,  this.token
     )
  }

  getByTipoPostagem(tipoPostagem: string): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(`https://ciclonext.herokuapp.com/api/v1/postagem/tipoPostagem/${tipoPostagem}`
    // , this.token
    )
  }

  getByCorpoPostagem(corpo: string): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(`https://ciclonext.herokuapp.com/api/v1/postagem/corpo/${corpo}`
    // , this.token
    )
  }


  // getAllPostagem(): Observable<Postagem[]> {
   
  //   return this.http.get<Postagem[]>('http://localhost:8080/api/v1/postagem/getAll', this.token)
    
  // }

  // postPostagem(postagem: Postagem): Observable<Postagem> {
  //   return this.http.post<Postagem>('http://localhost:8080/api/v1/postagem', postagem, this.token)
  // }

  // procurarUsuario(id: number): Observable<Usuario>{
  //   return this.http.get<Usuario>(`http://localhost:8080/api/v1/usuario/${id}`, this.token)
  
  // }

}
