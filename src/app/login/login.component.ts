import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Location } from '@angular/common';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { MenuService } from '../services/menu/menu.service';
import { UserData } from '../models/userdata.model';

// se declara porq el init-plugins no es reconocido y existe:
declare function init_plugins();
// tambn se puso en el pages.ts y en ngoninit de ese mismo

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  static location: Location;
  userData: UserData;
  user = {
    email: '',
    password: ''
  };

  facebook = {
    loggedIn : false,
    name : '',
    email : '',
    profilePicture: ''
  };
  google = {
    loggedIn : false,
    name : '',
    email : '',
    profilePicture: ''
  };

  constructor( public router: Router,
    private _firebaseAuth: AngularFireAuth,
    public authService: AuthService,
    private db: AngularFireDatabase, // REFERENCIA A LA REALTIMEDATABASE
    private _settingsService: MenuService,
    /* private location: Location,
    private _activatedRoute: ActivatedRoute, */
    private afauth: AngularFireAuth ) { this.userData = new UserData('XXX'); }
  ngOnInit() {
    init_plugins();
    this.drawRectable();
  }

  drawRectable() { // RECIBE EL TAMAÑO DEL TABLERO: N X N //debería recibir el obj juego
    const canvas: any = document.getElementById('stage');
    canvas.width = 10 * 90;  // VARIABLES QUE ACTUALIZAN LOS VALORES DEL CANVAS DE ACUERDO AL TAMAÑO DEL TABLERO
    canvas.height = 10 * 90;
        // se debe cambiar este ciclo x un ngFor y con una variable cargada desde el backend
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height); // LIMPIA EL CANVAS
      for ( let i = 0; i <= 10; i++) { // CICLO QUE SE ENCARGA DE INSERTAR CADA FICHA
        for (let j = 0; j <= 10; j++) {
          const randomR = Math.floor((Math.random() * 253) + 1);
          const randomG = Math.floor((Math.random() * 253) + 1);
          const randomB = Math.floor((Math.random() * 253) + 1);
          const color = 'rgb(' + randomR + ',' + randomG + ',' + randomB + ')';
          ctx.fillStyle = color;
          ctx.strokeRect(i * 90, j * 90, 90, 90); // ES UNA FICHA CON FORMATO: (x,y,width,height)
          ctx.fillRect(i * 90, j * 90, 90, 90);
        }
      }
    }
   }
  // ingresar(name: string)
  ingresar() {
    // this.router.navigate([ '/dashboard', name]);
    this.router.navigate(['/menu']);
  }

  signInWithEmailFist() { // Si es registrar es signed up
    this.authService.registerUser(this.user.email, this.user.password)
    .then((res) => {
      // ALERT QUE YA SE REGISTRÓ
      console.log(this.user.email);
      console.log(this.user.password);
    })
    .catch((err) => console.log('error: ' + err));
  }

  signInWithEmail() {
    this.authService.signInRegular(this.user.email, this.user.password)
    .then((res) => {
      console.log(res);
      this.ingresar();
    })
    .catch((err) => console.log('error: ' + err));
  }

  signInWithFacebook() { // PENDIENTE REVISAR.
    // this.afauth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    this.authService.signInWithFacebook()
    .then((res) => {
      console.log(res);
      // this.addUser(res.user.displayName); // SE GUARDA EL USUARIO EN LA BD
      this.ingresar();
    }); }

  signInWithGoogle() {
    console.log(this.userData.userName);
      // this.afauth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    this.authService.signInWithGoogle()
    .then((res) => {
      // aquí debería cargar los datos al backend
      this.userData.userName = res.user.displayName;
      this._settingsService.setData(this.userData).subscribe(
        result => { // llamar no a un service si no hacer la petición directamente
          this.userData.userName = result.userName;
          // console.log('NOMBRE RECIBIDO: ', this.userData.userName);
        },
        error => {
          console.log(<any>error);
        }
      );
      this.ingresar();
      // console.log(res.user.displayName);
    })
    .catch((err) => console.log(err));
  }

    logoutwithgoogle() {
      this.google.loggedIn = false;
      this.afauth.auth.signOut();
      console.log('Out Google');
      this._firebaseAuth.auth.signOut(); // puse ;
      /*
      this._firebaseAuth.auth.signOut(); // puse ;
      console.log('Out');
      return this._firebaseAuth.auth.signOut(); */
    }

    logoutwithfb() {
      this.facebook.loggedIn = false;
      this.afauth.auth.signOut();
      console.log('Out FB');
      this._firebaseAuth.auth.signOut(); // puse ;
/*       this._firebaseAuth.auth.signOut(); // puse ;
      console.log('Out');
      return this._firebaseAuth.auth.signOut(); */
    }
}
