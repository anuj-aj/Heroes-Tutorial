import { Injectable } from '@angular/core';
import {  heroes} from '../models/mockHeroes';
import { Hero } from '../models/hero';
import { Observable, of } from 'rxjs';
import {MessageService} from '../messageService/message.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throws } from 'node:assert';
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,private messageService:MessageService) { }

    /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes',[]))
    );
  }

/** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  searchHero(term:string):Observable<Hero[]>{
    if(!term.trim()){
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x=>x.length? 
        this.log(`found heroes matching ${term})`):
        this.log(`no heroes matching ${term})`)),
      catchError(this.handleError<any>('searchHero'))
    );
    
  }

  addHero(hero:Hero):Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl,hero,this.httpOptions).pipe(
      tap((newHero: Hero)=> this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<any>('addHero'))
    );    
  }

  deleteHero(id:number):Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url,this.httpOptions).pipe(
      tap(_=>this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
    .pipe(
      tap(_=> this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
    // const hero = heroes.find(h => h.id === id) as Hero;
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    // return of(hero);
  }

}
