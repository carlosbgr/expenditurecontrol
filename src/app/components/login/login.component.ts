import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { StorageService } from '../../services/storage/storage.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { EStatusRequestDatabase } from '../../../core/enums/database';
import { AppSettings } from '../../../core/appSettings';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  loginFrm: FormGroup;
  typeFrm: FormGroup;
  typesOrganism: any[];
  selectedType: number;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _translateService: TranslateService,
    private _http: HttpClient,
    private _storageService: StorageService,
    ) {
    this.loginFrm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.loginFrm.reset();
  }

  tryLogin(form: any) {
    const body = new HttpParams()
      .set('email', form.email)
      .set('password', form.password);
    this._http.post(`${AppSettings.users}`  + 'authenticate', body.toString(), AppSettings.optionsEndpoint())
      .subscribe((data: any) => {
        if (data.body.status === EStatusRequestDatabase.success) {
          this._router.navigate(['/menu']);
          this._storageService.setItem('LoggedInUser', data.body.data.user.email);
          this._storageService.setItem('tkn', data.body.data.token);
        } else {
          switch (data.body.message) {
            case 'User not found.':
              this._toastrService.warning(this._translateService.instant('Login.Errors.UserNotFound'));
              break;
            case 'auth/wrong-password':
              this._toastrService.warning(this._translateService.instant('Login.Errors.WrongPassword'));
              break;
            default:
              this._toastrService.warning(this._translateService.instant('Login.Errors.Other'));
              break;
          }
        }
      });
  }
}
