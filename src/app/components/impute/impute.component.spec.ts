import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImputeComponent } from './impute.component';

describe('ImputeComponent', () => {
  let component: ImputeComponent;
  let fixture: ComponentFixture<ImputeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImputeComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
