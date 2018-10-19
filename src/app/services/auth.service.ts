import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  constructor(
    public _firebaseAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase, // REFERENCIA A LA REALTIMEDATABASE
    public afAuth: AngularFireAuth) {
      this.user = _firebaseAuth.authState;
      this.user.subscribe((user) => {
        if (user) {
          this.userDetails = user;
          // console.log(this.userDetails);
        } else {
          this.userDetails = null;
        }
      }
    );
  }
  addUser(data, uId) { // FUNCIÓN QUE GUARDA A UN USUARIO EN LA BASE DE DATOS
    const obj = this.db.database.ref('Usuarios' );
    obj.push({email: data, uid: uId, juego: 'pendiente'}); // SE DEFINE CUÁLES DATOS SE VAN A GUARDAR
    console.log('Success');
  }
  showUser(uidA) { // MUESTRA A UN USUARIO CUANDO INICIA SESIÓN DESDE FB // uidx: (this.afAuth.auth.currentUser.uid)
  if (this.db.database.ref('Usuarios/' + this.userDetails.uid).equalTo(uidA) ) {
      console.log( 'EMAIL del usuario ingresado: ' + this.userDetails.email + 'UID-AUTH:' + this.userDetails.uid);
  } else {
    console.log ('Datos del usuario no encontrado');
  }
    // ----------------------------------------------------
     // IMPRIME A TODOS LOS USUARIOS DE LA BD, once: lee datos una sola vez
     /*const dataRef = this.db.database.ref('/Usuarios');
    dataRef.once('value' , snapshot => {
        console.log(snapshot.val());
    });*/
    }
  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential( email, password );
    this.showUser(this.afAuth.auth.currentUser.uid); // PARA PROBAR FUNCIÓN SHOWUSER
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signInWithGoogle() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.afAuth.auth.signInWithPopup(provider)
      .then(res => {
        resolve(res);
      //  --------ESTA SECCIÓN VERIFICA SI EL USUARIO EXISTE EN LA BD, SI NO EXISTE SE AGREGA A LA BD----
      const uidA = this.afAuth.auth.currentUser.uid;
      if (this.db.database.ref('Usuarios/' + this.userDetails.uid).equalTo(uidA) ) {
      console.log( 'usuario existe');
      } else {
        this.addUser(this.afAuth.auth.currentUser.email, this.afAuth.auth.currentUser.uid);
      }
     // ----------------------------------------------------------
      }, err => {
        console.log(err);
        reject(err);
      });
    });
    /* return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ); */
  }

  signInWithFacebook() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth.signInWithPopup(provider)
      .then(res => {
        resolve(res);
        //  -----ESTA SECCIÓN VERIFICA SI EL USUARIO EXISTE EN LA BD, SI NO EXISTE SE AGREGA A LA BD----
      const uidA = this.afAuth.auth.currentUser.uid;
      if (this.db.database.ref('Usuarios/' + this.userDetails.uid).equalTo(uidA) ) {
      console.log( 'usuario existe');
      } else {
        this.addUser(this.afAuth.auth.currentUser.email, this.afAuth.auth.currentUser.uid);
      }
     // ----------------------------------------------------------
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then( userData =>  resolve(userData),
      err => reject (err));
      // ------- CADA REGISTRO DE USUARIO CON EMAIL SE GUARDA EN REALTIMEDB -----------
      this.addUser(this.afAuth.auth.currentUser.email, this.afAuth.auth.currentUser.uid);
    });
  }
  isLoggedIn() {
    if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }
  logout() { // ???
    this._firebaseAuth.auth.signOut()
    .then((res) => this.router.navigate(['/']));
    return this.afAuth.auth.signOut();
  }
}
