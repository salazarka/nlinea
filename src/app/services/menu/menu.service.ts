import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config'; // CONST...
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from '../../models/userdata.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    public http: HttpClient
  ) { }
  setData(userData: UserData): Observable<any> {
    const params = JSON.stringify(userData);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + '/game/setuserdata';
    console.log('GENERATING REQUEST...\n');
    return this.http.post(url, params, {headers: headers});
  }
  retrieveData(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = URL_SERVICIOS + '/game/getuserdata';
    console.log('GENERATING REQUEST...\n');
    return this.http.get(url, {headers: headers});
  }




}
 /*  setData(userData: UserData): Observable<any> {
    const params = JSON.stringify(userData);
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); 
    const url = URL_SERVICIOS + '/game/setuserdata';
    console.log('GENERATING REQUEST...\n');
    return this.http.post(url, params, {headers: headers});
  }
} */
