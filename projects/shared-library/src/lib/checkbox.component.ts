import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shr-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  @Input() controlId: string;
  @Output() checkedChange: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  @Input() readonly = false;
  @Input() label: string;
  @Input() form: FormGroup;

  private value = false;

  get checked() {
    return this.value;
  }

  @Input()
  set checked(value) {
    if (this.value !== value) {
      this.value = value;
      this.checkedChange.emit(value);
    }
  }

  constructor() {}

  getCssClass(): string {
    return this.readonly ? 'no-pointer mb-0 readonly' : 'btn mb-0';
  }
}
