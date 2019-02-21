import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { User } from '../../classes/user';

import * as moment from 'moment';
import { DatabaseService } from 'src/app/services/database/database.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  errorMessage: string;
  signupFrm: FormGroup;

  constructor(
    private _authService: AuthService,
    private _dbService: DatabaseService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _translate: TranslateService,
    private _firestore: FirestoreService,
  ) {
    this.signupFrm = this._formBuilder.group({
      userName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birth: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      verifyEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.signupFrm.reset();
  }

  trySignup(form: Form) {
    if (this.validateFields(form) && !this.userExist(form)) {
      this._authService.doSignUp(form['email'], form['password']);
      this.createUser(form);
    }
  }

  validateFields(form: Form): boolean {
    let validate = true;
    if (!this.validateAdult(form['birth'])) {
      validate = false;
      this._toastrService.warning(this._translate.instant('SignUp.Errors.NoOlder'));
    }

    if (!this.validateEmail(form['email'], form['verifyEmail'])) {
      validate = false;
      this._toastrService.warning(this._translate.instant('SignUp.Errors.EmailNoEquals'));
    }

    if (this.validatePassword(form['password']) !== 100) {
      validate = false;
      this._toastrService.warning(this._translate.instant('SignUp.Errors.UnsafePassword'));
    }
    return validate;
  }

  validateAdult(birth: string): boolean {
    const age: number = parseInt(moment(birth).fromNow(true).substr(0, 2).toString(), 0);
    if (age >= 18) {
      return true;
    }
  }

  validateEmail(email: string, verifyEmail: string): boolean {
    if (email.toLowerCase().trim() === verifyEmail.toLowerCase().trim()) {
      return true;
    }
  }

  validatePassword(password: string): number {
    let security = 0;
    if (password.length !== 0) {
      if ((password.length >= 8)) {
        security += 20;
      }

      if (this.containsNumbers(password) === undefined) {
        security += 20;
      }

      if (this.containsLowerCaseLetter(password) === undefined) {
        security += 20;
      }

      if (this.containsCapitalLetter(password) === undefined) {
        security += 20;
      }

      if (this.containsSymbols(password) === undefined) {
        security += 20;
      }
    }
    return security;
  }

  containsNumbers(text: string): boolean {
    if (!text.match(/[0-9]/)) {
      return false;
    }
  }

  containsLowerCaseLetter(text: string): boolean {
    if (!text.match(/[a-z]/)) {
      return false;
    }
  }

  containsCapitalLetter(text: string): boolean {
    if (!text.match(/[A-Z]/)) {
      return false;
    }
  }

  containsSymbols(text: string): boolean {
    if (!text.match(/[$@$!%*?&#.$($)$-$_]/)) {
      return false;
    }
  }

  userExist(form: Form): boolean {
    // let itsOk = false;
    // this._dbService.getOne('Users', 'email', form['email']).then((res: any) => {
    //   if (res) {
    //     itsOk = true;
    //   }
    // });
    console.log(this._firestore.find('Users', 'userName', form['userName']));
    return this._firestore.find('Users', 'userName', form['userName']);

    // return itsOk;
  }

  createUser(form: Form) {
    // const user = {
    //   userName: form['userName'],
    //   name: form['name'],
    //   lastName: form['lastName'],
    //   email: form['email'],
    //   birth: form['birth'],
    // };

    const user = new User(form['userName'], form['name'], form['lastName'], form['email'], form['birth']);

    console.log(user);

    // if (this._firestore.create('Users', user.getUser())) {
    //   this._toastrService.warning(this._translate.instant('SignUp.Errors.RegisteredUserName'));
    // }

    // if (this._dbService.set('Users', user)) {
    //   this._toastrService.warning(this._translate.instant('SignUp.Errors.RegisteredUserName'));
    // }
  }
}
