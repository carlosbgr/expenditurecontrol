import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { firebase } from '@firebase/app';
import '@firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private _toastr: ToastrService, private _translate: TranslateService) { }

  doLogin(value: any) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.userName, value.password)
      .then((res) => {
        resolve(res);
        localStorage.setItem('LoggedInUser', res.user.email);
      }, (err) => {
        reject(err);
        console.log(err);
      });
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut();
        resolve();
        localStorage.removeItem('LoggedInUser');
      } else {
        reject();
      }
    });
  }

  isLoggednIn() {
    return localStorage.getItem('LoggedInUser') !== null;
  }

  doSignUp(email: string, password: string): any {
    let itsOk: boolean;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      itsOk = true;
    }).catch((err) => {
      switch (err.code) {
        case 'auth/email-already-in-use':
          this._toastr.warning(this._translate.instant('SignUp.Errors.RegisteredEmail'));
          break;
        case 'auth/weak-password':
          this._toastr.warning(this._translate.instant('SignUp.Errors.UnsafePassword'));
          break;
        default:
          this._toastr.warning(this._translate.instant('SignUp.Errors.Others'));
          break;
      }
      itsOk = false;
    });
    return itsOk;
  }
}
