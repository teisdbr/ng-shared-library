import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DateComponent } from './date/date.component';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import {
  DatepickerModule,
  BsDatepickerModule,
  TimepickerModule
} from 'ngx-bootstrap';
import { SelectListComponent } from './select-list/select-list.component';
import { JsignComponent } from './jsign/jsign.component';
import { ParishComponent } from './parish/parish.component';
import { RegionComponent } from './region/region.component';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { AddressComponent } from './address/address.component';
import { PersonComponent } from './person/person.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ParishMultiselectComponent } from '../lib/parish-multiselect/parish-multiselect.component';
import { RegionMultiselectComponent } from '../public-api';
import { PasswordInputComponent } from './password/new/new.component';
import { PasswordFeedbackComponent } from './password/password-feedback/password-feedback.component';

import { StrengthMeterComponent } from './password/strength-meter/strength-meter.component';
import { StrongPasswordValidatorDirective } from '../directives/strong-password.directive';
import { CardComponent } from './card/card.component';

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
    CardComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    CommonModule,
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
    CardComponent
  ]
})
export class SharedLibraryModule {}
