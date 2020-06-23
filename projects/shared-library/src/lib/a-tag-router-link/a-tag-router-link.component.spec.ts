import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ATagRouterLinkComponent } from './a-tag-router-link.component';

describe('ATagRouterLinkComponent', () => {
  let component: ATagRouterLinkComponent;
  let fixture: ComponentFixture<ATagRouterLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ATagRouterLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ATagRouterLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
