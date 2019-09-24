import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DateComponent } from './date/date.component';

@NgModule({
  declarations: [CheckboxComponent, DateComponent],
  imports: [FormsModule, BrowserModule, CommonModule],
  exports: [CheckboxComponent, DateComponent]
})
export class SharedLibraryModule {}
