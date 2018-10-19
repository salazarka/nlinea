import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document) {
    // el constructor carga los ajustes
    this.cargarAjustes();
   }


  guardarAjustes() {
    // este solo graba strings, para cambiar tipo dato se usa el JSON
    console.log('Guardado en el localstorage');
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes) );
  }

  cargarAjustes() {
    if ( localStorage.getItem('ajustes')) {
      // se usa el json.parse para cambiar de string  a objeto
      this.ajustes = JSON.parse( localStorage.getItem('ajustes') );
      console.log( 'cargando del localstorage');

      // para que la cuestion 'dispare' hay q hacer unas modificaciones en el app.ts
      this.aplicarTema( this.ajustes.tema );


    } else {
      // console.log( 'usando valores por defecto');
    }
  }

  // esta funcion se encarga de settear el tema de fijo se haga lo q se haga
  aplicarTema( tema: string) {

    const url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }
}
  // se crea unos valores por defecto para poder establecer un tema, y saber cual está seleccionado
// el interface ayuda a restringirse qué tipo de info se va a usar en ajustes
interface Ajustes {
  temaUrl: string;
  tema: string;
}
