import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  languages: any[] = [];

  constructor(private translate: TranslateService, private http: HttpClient) {
    translate.setDefaultLang('es');
    this.getJSON('../assets/i18n/languages.json').subscribe((lan) => {
      for (let i = 0 ; i < lan.length; i += 1) {
        this.languages.push(lan[i]);
      }
    });
  }

  public getJSON(json: string): Observable<any> {
    return this.http.get(json);
  }

  switchLanguage(event) {
    this.translate.use(event.target.selectedOptions[0].id);
  }
}
