import { Observable, map, tap } from "rxjs";
import { Filme } from "../models/filme";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
@Injectable({
    providedIn: 'root',
})
export class FilmeService {

    
    chave = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjhlYTk0NGI2ZWI4ZTFjNDM2NTVmNzE2NTNhMmQ5ZCIsInN1YiI6IjY1MTE4Y2I4MzQ0YThlMDk3M2FkNTlmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P3YlIfv8UK_TxjJi3Jls1_AjNhtvVNJqv1uykmHUC_Y';

    constructor(private http: HttpClient, private sanitizer: DomSanitizer ) {
        
    }

    PesquisarFilmes(termoPesquisa: string): Observable<Filme[]> {
        const url = `https://api.themoviedb.org/3/search/movie?query=${termoPesquisa}&language=pt-BR`;
      
        console.log('URL da pesquisa:', url); 
      
        return this.http.get<any>(url, this.obterHeaderAutorizacao()).pipe(
          map((res) => {
            console.log('Resposta da API:', res);
            
            const filmesComPoster = res.results.filter((filme:any) =>
            filme.poster_path);
            return filmesComPoster;
          }),
          map((objetos) => this.mapearLista(objetos))
        );
      }

    PegarFilme(id: any){
        const url = `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`;
        return this.http.get<any>(url,this.obterHeaderAutorizacao()).pipe(
            map(objeto => this.mapearFilme(objeto)),
            tap(v => console.log(v)),
        )
    }
    PegarDetalhesDoFilme(id: any): Observable<any> {
        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=credits`;
    
        return this.http.get<any>(url,this.obterHeaderAutorizacao()).pipe(
          map(res => {
          
            const diretor = res.credits.crew.find((person: any) => person.job === 'Director');
            const elenco = res.credits.cast.map((ator: any) => {
                return{
                    nome: ator.name,
                    foto: `https://image.tmdb.org/t/p/w185${ator.profile_path}`
                };
            });
    
            return {
              diretor: diretor ? diretor.name : 'Não encontrado',
              elenco: elenco
            };
          })
        );
    }

    

    


    
    PesquisarListaEmAlta(page: String): Observable<Filme[]> {

      const url = `https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=${page}`;

      return this.http.get<any>(url,this.obterHeaderAutorizacao()).pipe(
          map(res => res.results),
          map(objetos => this.mapearLista(objetos)),

      );

  }

  PegarGenerosDoFilme(id: any): Observable<string[]> {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

    return this.http.get<any>(url, this.obterHeaderAutorizacao()).pipe(
      map(objeto => objeto.genres.map((genre: any) => genre.name))
    );
  }

  

// PegarGenerosDoFilme(id: any): Observable<string[]> {
//     const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

//     return this.http.get<any>(url, this.obterHeaderAutorizacao()).pipe(
//       map(objeto => this.mapearGeneros(objeto.genres))
//     );
//   }

//   private mapearGeneros(generos: any[]): string[] {
//     return generos.map((genre: any) => genre.name);
//   }

  DetalhesFilme(filmeId: number): Observable<Filme[]> {

    const url = 'https://api.themoviedb.org/3/movie/movie_id?language=en-US';

    return this.http.get<any>(url,this.obterHeaderAutorizacao()).pipe(
        map(res => res.results),
        map(objetos => this.mapearLista(objetos)),

    );

}

PegarTrailerDoFilme(id: any): Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
  
    return this.http.get<any>(url, this.obterHeaderAutorizacao()).pipe(
      map(response => {
        const trailer = response.results.find((video: any) => video.type === 'Trailer');
        if (trailer) {
          return `https://www.youtube.com/embed/${trailer.key}`;
        } else {
          return ''; 
        }
      })
    );
  }

  private obterHeaderAutorizacao() {

      return {
          method: "GET",
          headers: {
              accept: "application/json",
              Authorization: `Bearer ${this.chave}`,
          },
      }
  }


   mapearLista(obj: any[]): Filme[] {

      return obj.map(obj => {
          return {

              id: obj.id,
              nomePt: obj.title,
              nomeOriginal: obj.original_title,
              generos: ['', ''],
              sinopse: obj.overview,
              posterUrl: "https://image.tmdb.org/t/p/original/" + obj.poster_path,
              videoUrl: "https://www.youtube.com/embed/",
              anoLancamento: obj.release_date,
              diretor: "",
              elenco: []

          }
      })

  }

  mapearFilme(obj: any): Filme{
    return {
        id: obj.id,
        nomePt: obj.title,
        nomeOriginal: obj.original_title,
        generos: ['', ''],
        sinopse: obj.overview,
        posterUrl: "https://image.tmdb.org/t/p/original/" + obj.poster_path,
        videoUrl: "https://www.youtube.com/embed/",
        anoLancamento: obj.release_date,
        diretor: "",
        elenco: []
    }
}

  

 pesquisarDiretor(id: any): any {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=pt-BR`;

    const response =   this.http.get<any>(url,this.obterHeaderAutorizacao()).pipe(
        map(res => res.results),
        map(objetos => this.mapearLista(objetos)),

    );
    const data = this.http.get<any>(url,this.obterHeaderAutorizacao()).pipe(
        map(res => res.results),
        map(objetos => this.mapearLista(objetos)),

    );

    
   

   
}



}

