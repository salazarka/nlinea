import { Injectable } from '@angular/core';
import { Game } from '../../models/game.model';
import { URL_SERVICIOS } from '../../config/config'; // CONST...
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// SERVICIO QUE SE ENCARGA DE COMUNICARSE CON EL BACK END:
@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(
    public http: HttpClient
  ) { }
  // RECIBE VAR DE TIPO game (game.model) Y DEVUELVE UN OBSERVABLE
  newGame(game: Game): Observable<any> {
    const params = JSON.stringify(game);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + '/game/setgame';
    console.log('GENERATING REQUEST...\n');
    return this.http.post(url, params, {headers: headers});
  }
  retrieveGame(): Observable<any> {
    // const params = JSON.stringify(game);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + '/game/getgame';
    console.log('GENERATING REQUEST...\n');
    return this.http.get(url, {headers: headers});
  }
  playGame(game: Game): Observable<any> {
    const params = JSON.stringify(game);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + '/game/makePlay';
    console.log('GENERATING REQUEST...\n');
    return this.http.post(url, params, {headers: headers});

  }
}
