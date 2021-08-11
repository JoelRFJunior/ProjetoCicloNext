import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioAtualizar } from '../model/UsuarioAtualizar';
import { UsuarioLoginDTO } from '../model/UsuarioLoginDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient

  ) { }

entrar(usuarioLoginDTO: UsuarioLoginDTO ): Observable<UsuarioLoginDTO>{
  return this.http.post<UsuarioLoginDTO>('https://ciclonext.herokuapp.com/api/v1/usuario/logar', usuarioLoginDTO)

}

cadastrar(usuario: Usuario): Observable<Usuario>{
  return this.http.post<Usuario>('https://ciclonext.herokuapp.com/api/v1/usuario/cadastrar', usuario)

}

alterar(usuario: UsuarioAtualizar): Observable<UsuarioAtualizar>{
  return this.http.put<UsuarioAtualizar>('https://ciclonext.herokuapp.com/api/v1/usuario/alterar', usuario)


}

getByIdUser(id: number): Observable<Usuario>{
  return this.http.get<Usuario>(`http://ciclonext.herokuapp.com/api/v1/usuario/${id}`)
}

// entrar(usuarioLoginDTO: UsuarioLoginDTO ): Observable<UsuarioLoginDTO>{
//   return this.http.post<UsuarioLoginDTO>('http://localhost:8080/api/v1/usuario/logar', usuarioLoginDTO)

// }

// cadastrar(usuario: Usuario): Observable<Usuario>{
//   return this.http.post<Usuario>('http://localhost:8080/api/v1/usuario/cadastrar', usuario)

// }

// getByIdUser(id: number): Observable<Usuario>{
//   return this.http.get<Usuario>(`http://localhost:8080/usuarios/${id}`)
// }


logado(){
  let ok:boolean = false
  if (environment.token != '') {
    ok = true
  }
  return ok
}

naoLogado(){
  let ok:boolean = false
  if (environment.token == '') {
    ok = true
  }
  return ok
}

}

