import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  // esto es para acceder al done, se usa una inyeccion de servicio
  constructor(
    // @Inject(DOCUMENT) private _document,
  // a continuacion se importa el servicio q esta en settings
  // con esto se puede usar donde sea lo q traiga ajustes, checkear que esté en el import arriba
  public _ajustes: SettingsService
) { }

  ngOnInit() {
    // cuando la pag se recargue, hace la  sig funcion:
    this.colocarCheck();

  }

  cambiarColo( tema: string, link: any ) {
   // console.log( tema );
   this.aplicarCheck( link );
   // let url = `assets/css/colors/default-dark.css`;
   // eso es lo que estaba, pero se necesita que "default dark" sea general, entonces:
    // let url = `assets/css/colors/${ tema }.css`;
    // ese 'tema' es del id que esta en index, la idea es cambiar el tema segun el color seleccionado
 /*    this._document.getElementById('tema').setAttribute('href', url);
    this._ajustes.ajustes.tema = tema;
    this._ajustes.ajustes.temaUrl = url;
    this._ajustes.guardarAjustes(); */
    this._ajustes.aplicarTema( tema );

  }

    // se crea otra función para q el "check animacion" se actualize
  aplicarCheck( link: any ) {

    let selectores: any = document.getElementsByClassName('selector')
      for ( let ref of selectores ) {
        ref.classList.remove('working');
      }
      link.classList.add('working');
  }

  // se va a crear un servicio nuevo para q cuando ud elija 'x' tema, y recarga la pag,
  // se le quede el 'x' tema seleccionado anteriormente, el servicio creado esta en el app.module
  colocarCheck() { // esto es para que el check esté siempre, a pesr de cualquier recarga de pag
    let selectores: any = document.getElementsByClassName('selector')
    // el tema está en el servicio de ajustes
    let tema = this._ajustes.ajustes.tema;
    for ( let ref of selectores ) {
      if ( ref.getAttribute('data-theme') === tema) {
         ref.classList.add('working');
         break;
      }
    }

  }
}
