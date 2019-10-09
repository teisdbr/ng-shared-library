import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParishMultiselectComponent } from './parish-multiselect.component';

describe('ParishMultiselectComponent', () => {
  let component: ParishMultiselectComponent;
  let fixture: ComponentFixture<ParishMultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParishMultiselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParishMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
