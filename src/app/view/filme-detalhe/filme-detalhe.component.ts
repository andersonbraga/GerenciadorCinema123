import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Filme } from 'src/app/models/filme';
import { FavoritosServiceService } from 'src/app/services/favoritos.service.service';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-filme-detalhe',
  templateUrl: './filme-detalhe.component.html',
  styleUrls: ['./filme-detalhe.component.css']
})
export class FilmeDetalheComponent implements OnInit {
  @Input() filme: any = {
    id: 0,
    nomePt: '',
    nomeOriginal: '',
    generos: [],
    sinopse: '',
    posterUrl: '',
    videoUrl: '',
    anoLancamento: '',
    diretor: '',
    elenco: [],
};

show: Boolean = false;
categorias: any;
favorito: boolean = false;


  constructor(private favoritoService: FavoritosServiceService, private filmeService: FilmeService, private route: ActivatedRoute, private sanitizer: DomSanitizer){   }

  ngOnInit(): void {
  
    const id = parseInt(this.route.snapshot.paramMap.get('id') as string);

    this.filmeService.PegarFilme(id).subscribe((filme) => {
      this.filme = filme;
      console.log(filme);
      this.favorito = this.favoritoService.isFilmeFavorito(this.filme);
    });

    this.filmeService.PegarGenerosDoFilme(id).subscribe((generos) => {
      this.filme.generos = generos;
      console.log(this.filme.generos);
    });

    this.filmeService.PegarDetalhesDoFilme(id).subscribe((detalhes) => {
      this.filme.diretor = detalhes.diretor;
      this.filme.elenco = detalhes.elenco;
      console.log('Diretor:', detalhes.diretor);
      console.log('Elenco:', detalhes.elenco);
    });

    this.filmeService.PegarTrailerDoFilme(id).subscribe((video) => {
      this.filme.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        video
        
      );
      console.log('Trailer Link',this.filme.trailerUrl);
      
    });
    
  }

  // getFilme(filmeId: number) {
  //   setTimeout(() => {
  //     this.filmeService.DetalhesFilme(filmeId).subscribe((filme) => {
  //       this.filme = filme;
  //       this.numTemp.length = parseFloat(filme.posterUrl);
  //      });
  //   }, 3000);
  // }
  adicionarAosFavoritos(filme: Filme) {
    this.favoritoService.adicionarFavorito(filme);
    this.favorito = true;
    this.salvarFavoritosNoLocalStorage();
  }

  removerDosFavoritos(filme: Filme) {
    this.favoritoService.removerFavorito(filme);
    this.favorito = false;
    this.salvarFavoritosNoLocalStorage();
  }

  toggleFavorito(filme: Filme) {
    if (this.favoritoService.isFilmeFavorito(filme)) {
      this.favoritoService.removerFavorito(filme);
    } else {
      this.favoritoService.adicionarFavorito(filme);
    }
  
  
    this.favorito = this.favoritoService.isFilmeFavorito(filme);
  
   
    this.salvarFavoritosNoLocalStorage();
  }

  private salvarFavoritosNoLocalStorage() {
    const favoritos = this.favoritoService.listarFavoritos();
    localStorage.setItem('filmesFavoritos', JSON.stringify(favoritos));
  }


}
