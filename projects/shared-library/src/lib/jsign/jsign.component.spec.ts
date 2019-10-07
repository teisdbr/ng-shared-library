import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsignComponent } from './jsign.component';

describe('JsignComponent', () => {
  let component: JsignComponent;
  let fixture: ComponentFixture<JsignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
