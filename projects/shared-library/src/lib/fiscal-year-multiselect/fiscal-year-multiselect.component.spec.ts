import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalYearMultiselectComponent } from './fiscal-year-multiselect.component';

describe('FiscalYearMultiselectComponent', () => {
  let component: FiscalYearMultiselectComponent;
  let fixture: ComponentFixture<FiscalYearMultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiscalYearMultiselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiscalYearMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
