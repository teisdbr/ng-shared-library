import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { parishes } from '../../shared.constants';

import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shr-parish',
  templateUrl: './parish.component.html',
  styleUrls: ['./parish.component.scss']
})
export class ParishComponent implements OnDestroy, OnInit {
  @Input()
  readonly = false;
  @Input()
  form: FormGroup;
  @Input()
  parish: string;
  @Input()
  disableNullOption: boolean;
  @Output()
  parishChange: EventEmitter<string>;
  parishForm: FormGroup;
  parishes = parishes;

  private subs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.parishChange = new EventEmitter<string>();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnInit() {
    // initialize values
    this.parishForm = this.formBuilder.group({
      parish: [
        this.parish ? this.parish : null,
        this.form
          ? [Validators.required, Validators.pattern(/(?!null)[\w \.]+/)]
          : Validators.nullValidator
      ]
    });

    // initialize handlers
    this.subs.push(
      this.parishForm.valueChanges.subscribe(value => {
        this.parish = value;
      })
    );

    // add this form to parent form
    if (this.form && this.form.value !== undefined && this.form.value != null) {
      this.form.addControl('parishForm', this.parishForm);
    }
  }

  parishChanged() {
    this.parish = this.parishForm.get('parish').value;

    this.parishChange.emit(this.parish);
  }

  setFormValue(parish: string) {
    this.parishForm.patchValue({
      parish: parish
    });

    this.parish = parish;
  }
}
