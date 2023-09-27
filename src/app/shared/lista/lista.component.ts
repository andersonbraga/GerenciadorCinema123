import { Component, OnInit } from '@angular/core';
import { Filme } from 'src/app/models/filme';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  filmes: Filme[] = [];
  paginaAtual = 1; 
  filmesPorPagina = 20; 
  totalPaginas = 20; 
  paginas: number[] = []; 
  
  totalFilmes: number = 100;

  constructor(private filmeService: FilmeService){
  }
  ngOnInit(): void {
    this.GerarListaEmAlta();
  }
   GerarListaEmAlta(): any{
    this.filmeService.PesquisarListaEmAlta(this.paginaAtual.toString()).subscribe((filmes) => {
      
      
      this.filmes = filmes;
      console.log(this.filmes.length)
     });
   }

  irParaPagina(pagina: number) {

      this.paginaAtual = pagina;
      this.GerarListaEmAlta();
      console.log(this.paginaAtual);
    }
  }

   

