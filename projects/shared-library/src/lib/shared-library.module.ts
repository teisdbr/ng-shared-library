import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DateComponent } from './date/date.component';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap';
import { SelectListComponent } from './select-list/select-list.component';
import { JsignComponent } from './jsign/jsign.component';

@NgModule({
  declarations: [
    CheckboxComponent,
    DateComponent,
    DateRangePickerComponent,
    SelectListComponent,
    JsignComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    CommonModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [
    CheckboxComponent,
    DateComponent,
    DateRangePickerComponent,
    BsDatepickerModule,
    SelectListComponent,
    JsignComponent
  ]
})
export class SharedLibraryModule {}
