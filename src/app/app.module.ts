import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardFilmeComponent } from './shared/card-filme/card-filme.component';
import { HomeComponent } from './view/home/home.component';
import { ListaComponent } from './shared/lista/lista.component';
import { PaginacaoComponent } from './shared/paginacao/paginacao.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FilmeDetalheComponent } from './view/filme-detalhe/filme-detalhe.component';
import { FilmeSearchComponent } from './view/filme-search/filme-search.component';
import { FormsModule } from '@angular/forms';
import { FilmeFavoritoComponent } from './view/filme-favorito/filme-favorito.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





@NgModule({
  declarations: [
    AppComponent,
    CardFilmeComponent,
    HomeComponent,
    ListaComponent,
    PaginacaoComponent,
    NavbarComponent,
    FilmeDetalheComponent,
    FilmeSearchComponent,
    FilmeFavoritoComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, 
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
