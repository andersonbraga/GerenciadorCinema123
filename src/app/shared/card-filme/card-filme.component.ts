import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Filme } from 'src/app/models/filme';

@Component({
  selector: 'app-card-filme',
  templateUrl: './card-filme.component.html',
  styleUrls: ['./card-filme.component.css']
})
export class CardFilmeComponent {
  @Input() filme: Filme;

  show: Boolean = false;


  constructor(private router: Router){
    this.filme = new Filme(0, '', '', [], '', '', '', '', '', [])
  }

  // detalhesFilme(filmeId: number){
  //   this.router.navigate([`./view/${filmeId}`]);
  // }



}
