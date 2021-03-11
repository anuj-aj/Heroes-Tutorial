import { Injectable } from '@angular/core';
import {  heroes} from '../models/mockHeroes';
import { Hero } from '../models/hero';
import { Observable, of } from 'rxjs';
import {MessageService} from '../messageService/message.service'
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService:MessageService) { }

  getHeroes(): Observable<Hero[]> {
    const heros = of(heroes);
    this.messageService.add("Hero service : fetched Heroes");
    return heros;
  }
}
