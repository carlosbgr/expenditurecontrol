import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { EStatusRequestDatabase } from '../../../core/enums/database';

import { User } from '../../classes/user';

import * as moment from 'moment';
import { AppSettings } from 'src/core/appSettings';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  errorMessage: string;
  signupFrm: FormGroup;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _translateService: TranslateService,
    private _http: HttpClient,
  ) {
    this.signupFrm = this._formBuilder.group({
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

  trySignup(form: any) {
    const body = new HttpParams()
      .set('name', form.name)
      .set('lastName', form.lastName)
      .set('birth', form.birth)
      .set('email', form.email)
      .set('password', form.password)
      .set('language', 'ES');

    this._http.post(`${AppSettings.users}`  + 'register', body.toString(), AppSettings.optionsEndpoint())
      .subscribe((data: any) => {
        if (data.body.status === EStatusRequestDatabase.success) {
          this._router.navigate(['/menu']);
        } else {
          this._toastrService.warning(this._translateService.instant('Login.Errors.Other'));
        }
      });
  }

  validateFields(form: Form): boolean {
    let validate = true;
    if (!this.validateAdult(form['birth'])) {
      validate = false;
      this._toastrService.warning(this._translateService.instant('SignUp.Errors.NoOlder'));
    }

    if (!this.validateEmail(form['email'], form['verifyEmail'])) {
      validate = false;
      this._toastrService.warning(this._translateService.instant('SignUp.Errors.EmailNoEquals'));
    }

    if (this.validatePassword(form['password']) !== 100) {
      validate = false;
      this._toastrService.warning(this._translateService.instant('SignUp.Errors.UnsafePassword'));
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

  createUser(form: Form): boolean {
    let itsOk = false;
    const user = new User(form['name'], form['lastName'], form['email'], form['birth'], null);
    const userObject = {
      name: user.getName(),
      lastName: user.getLastName(),
      email: user.getEmail(),
      birth: user.getBirth(),
    };

    return itsOk;
  }
}
