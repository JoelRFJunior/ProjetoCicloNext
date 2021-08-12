import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { GrupoDeleteComponent } from './delete/grupo-delete/grupo-delete.component';
import { PostagemDeleteComponent } from './delete/postagem-delete/postagem-delete.component';
import { GrupoEditComponent } from './edit/grupo-edit/grupo-edit.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { UserEditComponent } from './edit/user-edit/user-edit.component';
import { EntrarComponent } from './entrar/entrar.component';
import { GrupoPageComponent } from './grupo-page/grupo-page.component';
import { GrupoComponent } from './grupo/grupo.component';
import { HomeComponent } from './home/home.component';
import { PostagemComponent } from './postagem/postagem.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';

const routes: Routes = [

  { path: '', redirectTo: 'entrar', pathMatch: 'full' },

  { path: 'entrar', component: EntrarComponent },
  { path: 'cadastrar', component: CadastrarComponent },
  { path: 'sobre-nos', component: SobreNosComponent },
  { path: 'home', component: HomeComponent },
  { path: 'grupo', component: GrupoComponent },
  { path: 'postagem', component: PostagemComponent },
  { path: 'grupo-edit/:id', component: GrupoEditComponent },
  { path: 'grupo-delete/:id', component: GrupoDeleteComponent },
  { path: 'postagem-edit/:id', component: PostagemEditComponent },
  { path: 'postagem-delete/:id', component: PostagemDeleteComponent },
  { path: 'user-edit/:id', component: UserEditComponent},
  { path: 'grupo-page/:id', component: GrupoPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
