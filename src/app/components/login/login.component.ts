import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  loginFrm: FormGroup;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private translate: TranslateService
    ) {
    this.loginFrm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
   }

  ngOnInit() {
  }

  tryLogin(value) {
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(['/menu']);
    }, err => {
      switch (err.code) {
        case 'auth/user-not-found':
          this.toastr.warning(this.translate.instant('Login.Errors.UserNotFound'));
          break;
        case 'auth/wrong-password':
          this.toastr.warning(this.translate.instant('Login.Errors.WrongPassword'));
          break;
        default:
          this.toastr.warning(this.translate.instant('Login.Errors.Others'));
         break;
      }
    });
  }

}
