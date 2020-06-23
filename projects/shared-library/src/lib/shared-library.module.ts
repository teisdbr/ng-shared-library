import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DateComponent } from './date/date.component';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import {
  TimepickerModule
} from 'ngx-bootstrap/timepicker';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { SelectListComponent } from './select-list/select-list.component';
import { JsignComponent } from './jsign/jsign.component';
import { ParishComponent } from './parish/parish.component';
import { RegionComponent } from './region/region.component';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { AddressComponent } from './address/address.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PersonComponent } from './person/person.component';

import { ParishMultiselectComponent } from '../lib/parish-multiselect/parish-multiselect.component';

import { PasswordInputComponent } from './password/new/new.component';
import { PasswordFeedbackComponent } from './password/password-feedback/password-feedback.component';

import { StrengthMeterComponent } from './password/strength-meter/strength-meter.component';
import { StrongPasswordValidatorDirective } from '../directives/strong-password.directive';
import { CardComponent } from './card/card.component';
import { FiscalYearMultiselectComponent } from './fiscal-year-multiselect/fiscal-year-multiselect.component';
import { RegionMultiselectComponent } from './region-multiselect/region-multiselect.component';
import { CardLinkComponent } from './card-link/card-link.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ATagRouterLinkComponent } from './a-tag-router-link/a-tag-router-link.component';
import { createCustomElement } from '@angular/elements';
import { LazyElementDirective } from '../directives/lazy-element.directive';
import { SwalService } from '../services/swal.service';
@NgModule({
  declarations: [
    CheckboxComponent,
    DateComponent,
    DateRangePickerComponent,
    SelectListComponent,
    JsignComponent,
    ParishComponent,
    AddressComponent,
    RegionComponent,
    StrongPasswordValidatorDirective,
    DateTimePickerComponent,
    ParishMultiselectComponent,
    PersonComponent,
    RegionMultiselectComponent,
    PasswordInputComponent,
    PasswordFeedbackComponent,
    StrengthMeterComponent,
    CardComponent,
    FiscalYearMultiselectComponent,
    CardLinkComponent,
    SpinnerComponent,
    ATagRouterLinkComponent,
    LazyElementDirective
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    NgMultiSelectDropDownModule,
    TimepickerModule.forRoot(),
    TextMaskModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [
    CheckboxComponent,
    DateComponent,
    DateRangePickerComponent,
    BsDatepickerModule,
    SelectListComponent,
    JsignComponent,
    ParishComponent,
    RegionComponent,
    RegionMultiselectComponent,
    DateTimePickerComponent,
    AddressComponent,
    ParishMultiselectComponent,
    PersonComponent,
    PasswordInputComponent,
    CardComponent,
    FiscalYearMultiselectComponent,
    CardLinkComponent,
    SpinnerComponent,
    ATagRouterLinkComponent,
    TextMaskModule,
    LazyElementDirective
  ],
  providers:[SwalService],
  entryComponents: [ATagRouterLinkComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedLibraryModule {
  ngDoBootstrap() {}
  constructor(private injector: Injector) {
    // Convert `PopupComponent` to a custom element.
    const ATagRouterLinkElement = createCustomElement(ATagRouterLinkComponent, {
      injector
    });
    // Register the custom element with the browser.
    if (!customElements.get('a-tag-router-link-component')) {
      customElements.define(
        'a-tag-router-link-component',
        ATagRouterLinkElement
      );
    }
  }
}
