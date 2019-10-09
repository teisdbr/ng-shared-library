import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordFeedbackComponent } from './password-feedback.component';

describe('PasswordFeedbackComponent', () => {
  let component: PasswordFeedbackComponent;
  let fixture: ComponentFixture<PasswordFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
