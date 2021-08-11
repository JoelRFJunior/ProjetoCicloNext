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
import { PostagemDeleteComponent } from './delete/postagem-delete/postagem-delete.component';
import { UserEditComponent } from './edit/user-edit/user-edit.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AlertasComponent } from './alertas/alertas.component';
import { OrderModule } from 'ngx-order-pipe';
import { GrupoPageComponent } from './grupo-page/grupo-page.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule,BsDropdownConfig } from 'ngx-bootstrap/dropdown';




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
    GrupoDeleteComponent,
    PostagemDeleteComponent,
    UserEditComponent,
    PerfilComponent,
    GrupoPageComponent,
    AlertasComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OrderModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot( )
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
    
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }