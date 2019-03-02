import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  loginFrm: FormGroup;
  typeFrm: FormGroup;
  typesOrganism: any[];
  selectedType: number;

  constructor(
    public _authService: AuthService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _translateService: TranslateService,
    ) {
    this.loginFrm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.loginFrm.reset();
  }

  tryLogin(form: Form) {
    this._authService.doLogin(form)
    .then((resolve) => {
      this._router.navigate(['/menu']);
    },
    (error) => {
      switch (error.code) {
        case 'auth/user-not-found':
          this._toastrService.warning(this._translateService.instant('Login.Errors.UserNotFound'));
          break;
        case 'auth/wrong-password':
          this._toastrService.warning(this._translateService.instant('Login.Errors.WrongPassword'));
          break;
        default:
          this._toastrService.warning(this._translateService.instant('Login.Errors.Other'));
          break;
      }
    });
  }
}
