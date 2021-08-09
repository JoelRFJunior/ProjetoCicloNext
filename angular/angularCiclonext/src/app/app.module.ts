import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { RodapeComponent } from './rodape/rodape.component';
import { MenuComponent } from './menu/menu.component';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { HomeComponent } from './home/home.component';
import { GrupoComponent } from './grupo/grupo.component';
import { PostagemComponent } from './postagem/postagem.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { GrupoEditComponent } from './edit/grupo-edit/grupo-edit.component';
import { GrupoDeleteComponent } from './delete/grupo-delete/grupo-delete.component';




@NgModule({
  declarations: [
    AppComponent,
    SobreNosComponent,
    RodapeComponent,
    MenuComponent,
    EntrarComponent,
    CadastrarComponent,
    HomeComponent,
    GrupoComponent,
    PostagemComponent,
    PostagemEditComponent,
    GrupoEditComponent,
    GrupoDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }