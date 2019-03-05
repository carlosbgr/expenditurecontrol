import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { StorageService } from './services/storage/storage.service';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  languages: any[] = [];
  isLogged: boolean;

  constructor(
    private _translateService: TranslateService,
    private _http: HttpClient,
    private _storageService: StorageService,
    private _authService: AuthService,
    private _router: Router) {
    _translateService.setDefaultLang('es');
    this.getJSON('../assets/i18n/languages.json').subscribe((lan) => {
      for (let i = 0 ; i < lan.length; i += 1) {
        this.languages.push(lan[i]);
      }
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this._storageService.watchStorage().subscribe((data: string) => {
      if (data) {
        this.isLogged = true;
      }
    });
  }

  public getJSON(json: string): Observable<any> {
    return this._http.get(json);
  }

  switchLanguage(event) {
    this._translateService.use(event.target.selectedOptions[0].id);
  }

  logOut() {
    this._authService.doLogout();
    this.isLogged = false;
    this._router.navigate(['/']);

  }

}
