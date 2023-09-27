import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FavoritosServiceService {

  private chaveLocalStorage = 'filmesFavoritos';

  constructor() { }

  adicionarFavorito(filme: any) {
    
    const favoritos = this.obterFavoritos();

    
    if (!this.isFilmeFavorito(filme)) {
      favoritos.push(filme);

      
      localStorage.setItem(this.chaveLocalStorage, JSON.stringify(favoritos));
    }
  }

  removerFavorito(filme: any) {
  
    const favoritos = this.obterFavoritos();

   
    const index = favoritos.findIndex((fav) => fav.id === filme.id);
    if (index !== -1) {
      favoritos.splice(index, 1);

     
      localStorage.setItem(this.chaveLocalStorage, JSON.stringify(favoritos));
    }
  }

  listarFavoritos() {
    
    return this.obterFavoritos();
  }

  isFilmeFavorito(filme: any): boolean {

    const favoritos = this.obterFavoritos();
    return favoritos.some((fav) => fav.id === filme.id);
  }

  private obterFavoritos(): any[] {
   
    const favoritos = localStorage.getItem(this.chaveLocalStorage);
    return favoritos ? JSON.parse(favoritos) : [];
  }

}
