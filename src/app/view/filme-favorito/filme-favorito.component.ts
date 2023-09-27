import { Component, OnInit } from '@angular/core';
import { FavoritosServiceService } from 'src/app/services/favoritos.service.service';

@Component({
  selector: 'app-filme-favorito',
  templateUrl: './filme-favorito.component.html',
  styleUrls: ['./filme-favorito.component.css']
})
export class FilmeFavoritoComponent implements OnInit {
  filmesFavoritos: any[] = [];

  constructor(private favoritoService: FavoritosServiceService) { }
  
  ngOnInit(): void {
    this.filmesFavoritos = this.favoritoService.listarFavoritos();
  }

  removerDosFavoritos(filme: any) {
 
    this.favoritoService.removerFavorito(filme);

    
    this.filmesFavoritos = this.favoritoService.listarFavoritos();
  
}
}
