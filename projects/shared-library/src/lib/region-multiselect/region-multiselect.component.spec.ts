import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionMultiselectComponent } from './region-multiselect.component';

describe('RegionMultiselectComponent', () => {
  let component: RegionMultiselectComponent;
  let fixture: ComponentFixture<RegionMultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionMultiselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
