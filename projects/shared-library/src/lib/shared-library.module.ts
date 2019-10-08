import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DateComponent } from './date/date.component';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap';
import { SelectListComponent } from './select-list/select-list.component';
import { JsignComponent } from './jsign/jsign.component';
import { ParishComponent } from './parish/parish.component';
import { RegionComponent } from './region/region.component';
import { AddressComponent } from './address/address.component';

@NgModule({
  declarations: [
    CheckboxComponent,
    DateComponent,
    DateRangePickerComponent,
    SelectListComponent,
    JsignComponent,
    AddressComponent,
    RegionComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    CommonModule,
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
    RegionComponent
    AddressComponent
  ]
})
export class SharedLibraryModule {}
