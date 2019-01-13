import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { tokenReference } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.userName, value.password)
      .then(res => {
        resolve(res);
        localStorage.setItem('LoggedInUser', res.user.email);
      }, err => reject(err));
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve();
        localStorage.removeItem('LoggedInUser');
      } else {
        reject();
      }
    });
  }

  public isLoggednIn() {
    return localStorage.getItem('LoggedInUser') !== null;
  }

}
