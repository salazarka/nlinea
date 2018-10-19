import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  // a este view child se le pone de fijo una referencia html
 // se le pone a la par el nombre como lo quiero llamar aqui en el ts
  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('nombre') leyenda: string = 'Fichas de gane';
  @Input() progreso: number = 4;

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    // console.log('leyenda', this.leyenda);
    // console.log('progreso', this.progreso);

  }

  ngOnInit() {
    // console.log('leyenda', this.leyenda);
    // console.log('progreso', this.progreso);
  }

  onChanges( newValue: number) {
    // console.log( newValue);
    // esto es para controlar que el valor insertado desde la pag, sea el q está en el backend
    // let elemHTML: any = document.getElementsByName('progreso')[0]; // devuelve todo un arreglo con todo lo que tenga como name progreso
// console.log( this.txtProgress );


    // esto permite que al escribir algun num mayor a 100, la barra no lo permita
    // esto es depende de lo que se esté buscando
    if ( newValue >= 100 ) {
      this.progreso = 100;
    } else if ( newValue <= 0) {
      this.progreso = 0;
    } else {
          // en caso que sea un num permitido:
    this.progreso = newValue;
    }

    // elemHTML.value =  this.progreso;
    // el valor de elemhtml tambien se puede referencia por medio del "nativeelement", se ve en consol de google
    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit( this.progreso );
  }

  cambiarValor( valor: number ) {
    if (this.progreso >= 100 && valor > 0 ) {
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0 && valor < 0 ) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;

    this.cambioValor.emit( this.progreso);

    // esto es para cambiar el "foco" si uno desea
    this.txtProgress.nativeElement.focus();
  }


}
