import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DateComponent } from './date/date.component';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';

@NgModule({
  declarations: [CheckboxComponent, DateComponent, DateRangePickerComponent],
  imports: [FormsModule, BrowserModule, CommonModule],
  exports: [CheckboxComponent, DateComponent, DateRangePickerComponent]
})
export class SharedLibraryModule {}
