import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginError: string;
  loginFrm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginFrm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  login() {
    console.log('Login');
  }

}
