import { Component, OnInit } from '@angular/core';
import {Hero} from '../models/hero'
import {HeroService} from '../heroService/hero.service'
import { heroes } from '../models/mockHeroes';
import {MessageService} from '../messageService/message.service'
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // ;
  heroes :Hero[] = [];
  selectedHero?:Hero;
  constructor(private heroService: HeroService, private messageService: MessageService ) {
    // this.heroes = heroService.getHeroes();
   }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes=>this.heroes = heroes);
  }
  
  onSelect(hero:Hero) : void{
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

}
