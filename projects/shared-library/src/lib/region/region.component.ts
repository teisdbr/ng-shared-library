import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regions } from '../../shared.constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shr-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnDestroy, OnInit {
  @Input()
  readonly = false;
  @Input()
  form: FormGroup;
  @Input()
  region: string;
  @Output()
  regionChange: EventEmitter<string>;
  regionForm: FormGroup;
  regions = regions;

  private subs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.regionChange = new EventEmitter<string>();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnInit() {
    // initialize values
    this.regionForm = this.formBuilder.group({
      region: [
        this.region ? this.region : null,
        this.form
          ? [Validators.required, Validators.pattern(/(?!null)[\w \.]+/)]
          : Validators.nullValidator
      ]
    });

    // initialize handlers
    this.subs.push(
      this.regionForm.valueChanges.subscribe(value => {
        this.region = value;
      })
    );

    // add this form to parent form
    if (this.form && this.form.value !== undefined && this.form.value != null) {
      this.form.addControl('regionForm', this.regionForm);
    }
  }

  regionChanged() {
    this.region = this.regionForm.get('region').value;

    this.regionChange.emit(this.region);
  }

  setFormValue(region: string) {
    this.regionForm.patchValue({
      region: region
    });

    this.region = region;
  }
}
