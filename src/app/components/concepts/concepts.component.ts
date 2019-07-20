import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppSettings } from 'src/core/appSettings';
import { IConcept } from 'src/app/classes/concepts';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-responsive-bs4';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-concepts',
  templateUrl: './concepts.component.html',
})
export class ConceptsComponent implements OnInit, OnDestroy {

  concepts: IConcept[];
  selectorConcepts: IConcept[];
  modeEdition: boolean;
  conceptsForm: FormGroup;
  dataTable: any;
  appSettings = AppSettings;
  translateService: TranslateService;

  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _translateService: TranslateService,
    private _http: HttpClient,
    private _chRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.translateService = this._translateService,
    this.concepts = [];
    this.selectorConcepts = [];
    this.modeEdition = false;
    this.conceptsForm = this._formBuilder.group({
      title: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(50)])],
      isSubConcept: [0, [Validators.required]],
      conceptDependenceId: [null],
      isGenericConcept: [null],
      conceptOwnerId: [null],
    });
    this.conceptsForm.reset();
    this.getConcepts();
  }

  ngOnDestroy() {}

  private getConcepts() {
    this._http.get(`${AppSettings.concepts}`, AppSettings.optionsEndpoint())
      .subscribe((response) => {
        this.concepts = AppSettings.responseHttp(response);
        this.getConceptTitleByid(this.concepts);
        this._chRef.detectChanges();
        const table = $('#tableConcepts').DataTable(
          {
            columns: [
              null,
              null,
              {data: this.getConceptTitleByid(this.concepts)},
              null,
              {orderable: false},
            ],
            language: AppSettings.languageOptionsDataTable(this._translateService),
          });
        $(document).ready(
            // tslint:disable-next-line: ter-prefer-arrow-callback
            function () {
              $('#filters th').each(function (i: any) {
                const title = $('#tableConcepts thead th').eq($(this).index()).text();
                $(this).html(
              `<input class="form-control form-control-sm" type="text"`
              + `placeholder="Search ` + `${ title }` + `" data-index="` + `${i}` + `" />`,
              );
              });
              $(table.table().container()).on('keyup', '#filters input',
              function () {
                table.column($(this).data('index'))
                    .search(this.value).draw();
              });
            });
      }, (error) => {
        console.log(error);
      }, () => {
        this.concepts.forEach((c) => {
          if (!c.isSubConcept) { this.selectorConcepts.push(c); }
        });
      });
  }

  private getConceptTitleByid(concepts: IConcept[]) {
    concepts.forEach((concept: IConcept) => {
      if (concept.conceptDependenceId !== null) {
        const body = new HttpParams().set('conceptId', concept.conceptDependenceId);
        this._http.post(`${AppSettings.concepts}` + 'getConceptById', body.toString(), AppSettings.optionsEndpoint())
          .subscribe((response) => {
            concept.conceptDependeceName = AppSettings.responseHttp(response).title;
          });
      }
    });
  }

  private fillFormConcept(concept: IConcept) {
    this.conceptsForm.patchValue({ title: concept.title });
    this.conceptsForm.patchValue({ isSubConcept: concept.isSubConcept ? 0 : 1 });

    if (concept.conceptDependenceId === null) {
      this.conceptsForm.get('conceptDependenceId').disable();
    } else {
      this.conceptsForm.patchValue({ conceptDependenceId: concept.conceptDependenceId });
    }

    this.conceptsForm.patchValue({ conceptDependenceId: concept.conceptDependenceId });
    this.modeEdition = true;
  }

  // private createConcept(conceptForm: FormGroup) {
  //   // const concept: IConcept = conceptForm.value;
  //   const concept: IConcept = conceptForm.value;
  //   concept.isSubConcept = parseInt(conceptForm.value.isSubConcept, 10) === 0 ? false : true;
  //   concept.isGenericConcept = true;
  //   const body = new HttpParams()
  //     .set('title', concept.title)
  //     .set('isSubConcept', concept.isSubConcept)
  //     .set('conceptDependenceId', concept.conceptDependenceId)
  //     .set('isGenericConcept', concept.isGenericConcept)
  //     .set('conceptOwnerId', concept.conceptOwnerId);

  //   // let httpParams = new HttpParams();
  //   // Object.keys(concept).forEach((key) => {
  //   //   httpParams = httpParams.append(key, this.returnType(concept[key]));
  //   // });

  //   console.log(body);
  //   this._http.post(`${AppSettings.concepts}` + 'create', httpParams.toString(), AppSettings.optionsEndpoint())
  //   .subscribe((response) => {
  //     console.log(response);
  //   });
  // }

  private editConcept(conceptForm: FormGroup) {
    console.log(conceptForm.value);
    this.conceptsForm.reset();
    this.modeEdition = false;
    this.conceptsForm.enable();
  }

  private deleteConcept(concept: IConcept) {
    console.log(concept);
  }

  private returnType(variable: any) {
    const option = variable;
    console.log(typeof variable);
    switch (typeof variable) {
      case 'boolean':
        if (option === 'true') {
          console.log('t');
        } else if (option === 'false') {
          console.log('f');
        }
        break;
      case 'string':

        break;
      default:
        break;
    }

    return variable;
  }

}
