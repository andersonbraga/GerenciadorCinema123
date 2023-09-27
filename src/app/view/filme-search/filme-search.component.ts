import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { FilmeService } from 'src/app/services/filme.service';


@Component({
  selector: 'app-filme-search',
  templateUrl: './filme-search.component.html',
  styleUrls: ['./filme-search.component.css']
})

export class FilmeSearchComponent implements OnInit {

  termoPesquisa: string = ''; 
  resultados: any[] = [];
  show: Boolean = false;
  mostrarListaPadrao: boolean = false;

  constructor(
    private filmeService: FilmeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      const termoPesquisa = queryParams['termo'];
      if (termoPesquisa) {
     
        this.filmeService.PesquisarFilmes(termoPesquisa).subscribe((result) => {
          this.resultados = result;
          console.log('Resultados',this.resultados);
        });
      }
      // else  {
      //   this.mostrarListaPadrao = true;
      //   this.mostrarTodosFilmes();
      // }
    });
  }
  
  pesquisar() {
    if (this.termoPesquisa.trim() !== '') {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { termo: this.termoPesquisa },
        queryParamsHandling: 'merge',
      });
    } else {
      this.mostrarListaPadrao = true;

    }
  }




}