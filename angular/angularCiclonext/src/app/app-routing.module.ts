import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { GrupoDeleteComponent } from './delete/grupo-delete/grupo-delete.component';
import { GrupoEditComponent } from './edit/grupo-edit/grupo-edit.component';
import { EntrarComponent } from './entrar/entrar.component';
import { GrupoComponent } from './grupo/grupo.component';
import { HomeComponent } from './home/home.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';

const routes: Routes = [

  { path: '', redirectTo: 'entrar', pathMatch: 'full' },

  { path: 'entrar', component: EntrarComponent },
  { path: 'cadastrar', component: CadastrarComponent },
  { path: 'sobre-nos', component: SobreNosComponent },
  { path: 'home', component: HomeComponent },
  { path: 'grupo', component: GrupoComponent },
  { path: 'grupo-edit/:id', component: GrupoEditComponent },
  { path: 'grupo-delete/:id', component: GrupoDeleteComponent }
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
