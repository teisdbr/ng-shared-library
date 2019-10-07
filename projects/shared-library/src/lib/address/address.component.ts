import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Address } from '../../shared.models';
import { dataMask } from '../../shared.constants';
import { states } from '../../shared.constants';

import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shr-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnDestroy, OnInit {
  @Input()
  address: Address;
  @Input()
  readonly = true;
  @Input()
  form: FormGroup;
  @Input()
  required = true;
  @Input()
  stylingClasses = '';
  addressForm: FormGroup;
  stateDropdownOptions;
  zipMask: any[] = dataMask.zipCode.mask;

  private subs: Subscription[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnInit() {
    const that = this;

    // Initialize dropdown options
    this.stateDropdownOptions = states;
    // Initialize form values
    this.addressForm = this.formBuilder.group({
      addressLine1: this.address.addressLine1 ? this.address.addressLine1 : '',
      addressLine2: this.address.addressLine2 ? this.address.addressLine2 : '',
      city: this.address.city ? this.address.city : '',
      state: {
        value: this.address.state ? this.address.state : '',
        disabled: this.readonly
      },
      zip: this.address.zip
        ? ('0000' + this.address.zip.toString()).substr(-5, 5)
        : ''
    });

    if (this.required) {
      this.addressForm.get('addressLine1').setValidators(Validators.required);
      this.addressForm.get('city').setValidators(Validators.required);
      this.addressForm.get('state').setValidators(Validators.required);
      this.addressForm.get('zip').setValidators(Validators.required);
    }

    // Subscribe to form value changes
    this.subs.push(
      this.addressForm.valueChanges.subscribe(value => {
        that.address.addressLine1 = value.addressLine1;
        that.address.addressLine2 = value.addressLine2;
        that.address.city = value.city;
        that.address.state = value.state;
        that.address.zip = parseInt(value.zip, 10);
      })
    );

    // Add address form to parent form
    if (!this.readonly && this.form != null) {
      this.form.addControl('address', this.addressForm);
    }
  }

  setFormData(address: Address) {
    this.addressForm.patchValue({
      addressLine1: address.addressLine1 ? address.addressLine1 : '',
      addressLine2: address.addressLine2 ? address.addressLine2 : '',
      city: address.city ? address.city : '',
      state: address.state ? address.state : '',
      zip: address.zip ? ('0000' + address.zip.toString()).substr(-5, 5) : ''
    });
  }
}
