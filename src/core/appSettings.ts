import { HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

const API_ENDPOINT = 'http://localhost:3000/ExpenditureControl/api/';
const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

export class AppSettings {
  public static users = API_ENDPOINT.concat('users/');
  public static concepts = API_ENDPOINT.concat('concepts/');

  public static optionsEndpoint(): any {
    return { headers, observe: 'response' };
  }

  public static responseHttp(response: ArrayBuffer): any {
    return response['body']['data'];
  }

  public static translateTrueFalse(attribute: boolean, _translateService: TranslateService) {
    return attribute ? _translateService.instant('Application.Generics.Yes')
      : _translateService.instant('Application.Generics.No');
  }

  public static languageOptionsDataTable(_translateService: TranslateService) {
    return {
      decimal: _translateService.instant('Datatable.decimal'),
      emptyTable: _translateService.instant('Datatable.emptyTable'),
      info: _translateService.instant('Datatable.info'),
      infoEmpty: _translateService.instant('Datatable.infoEmpty'),
      infoFiltered: _translateService.instant('Datatable.infoFiltered'),
      infoPostFix: _translateService.instant('Datatable.infoPostFix'),
      thousands: _translateService.instant('Datatable.thousands'),
      lengthMenu: _translateService.instant('Datatable.lengthMenu'),
      loadingRecords: _translateService.instant('Datatable.loadingRecords'),
      processing: _translateService.instant('Datatable.processing'),
      search: _translateService.instant('Datatable.search'),
      zeroRecords: _translateService.instant('Datatable.zeroRecords'),
      paginate: {
        first: _translateService.instant('Datatable.paginate.first'),
        last: _translateService.instant('Datatable.paginate.last'),
        next: _translateService.instant('Datatable.paginate.next'),
        previous: _translateService.instant('Datatable.paginate.previous'),
      },
      aria: {
        sortAscending: _translateService.instant('Datatable.aria.sortAscending'),
        sortDescending: _translateService.instant('Datatable.aria.sortDescending'),
      },
    };
  }
}
