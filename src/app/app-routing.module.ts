import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './shared/lista/lista.component';
import { CardFilmeComponent } from './shared/card-filme/card-filme.component';
import { HomeComponent } from './view/home/home.component';
import { FilmeDetalheComponent } from './view/filme-detalhe/filme-detalhe.component';
import { FilmeSearchComponent } from './view/filme-search/filme-search.component';
import { FilmeFavoritoComponent } from './view/filme-favorito/filme-favorito.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'view/home',
    pathMatch: 'full',
  },
  {
    path: 'view/home',
    component:HomeComponent
    
  },
  {
    path: 'view/filme-favorito',
    component:FilmeFavoritoComponent
    
  },
  {
    path: 'view/filmedetalhe/:id',
    component:FilmeDetalheComponent
    
  },
  {
    path: 'view/filme-search',
    component:FilmeSearchComponent
    
  },

  {
    path: 'shared/lista',
    component: ListaComponent,
  },
  {
    path: 'shared/card-filme',
    component: CardFilmeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
