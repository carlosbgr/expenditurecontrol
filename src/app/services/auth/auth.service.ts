import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private _toastrService: ToastrService,
    private _translateService: TranslateService,
    private _storageService: StorageService) { }

  doLogin(value: any) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then((res) => {
        resolve(res);
        console.log(res);
        this._storageService.setItem('LoggedInUser', res.user.email);
      }, (err) => {
        reject(err);
      });
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut();
        resolve();
        this._storageService.removeItem('LoggedInUser');
      } else {
        reject();
      }
    });
  }

  isLoggednIn() {
    return localStorage.getItem('LoggedInUser') !== null;
  }

  doSignUp(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
            this._toastrService.warning(this._translateService.instant('SignUp.Errors.RegisteredEmail'));
            break;
          case 'auth/weak-password':
            this._toastrService.warning(this._translateService.instant('SignUp.Errors.UnsafePassword'));
            break;
          default:
            this._toastrService.warning(this._translateService.instant('SignUp.Errors.Others'));
            break;
        }
      });
  }

  exitsUser(email: string) {
    // let itsOK = false;
    // firebase.auth().fetchProvidersForEmail(email).then((exists) => {
    //   if (exists.length === 0) {
    //     itsOK = true;
    //   }
    // });
    // return itsOK;

    return new Promise<any>((resolve, reject) => {
      firebase.auth().fetchProvidersForEmail(email)
      .then((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
}
