import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Person } from '../../shared.models';
import { AddressComponent } from '../address/address.component';
import { Subscription } from 'rxjs';
import { dataMask } from '../../shared.constants';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shr-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnDestroy, OnInit {
  @Input() addressRequired = true;
  @Input() form: FormGroup;
  @Input() person: Person;
  @ViewChild(AddressComponent, { static: true })
  addressComponent: AddressComponent;
  personForm: FormGroup;
  phoneMask = dataMask.phoneNumber.mask;

  private subs: Subscription[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnInit() {
    const that = this;

    // Initialize values in the form model
    this.personForm = this.fb.group({
      firstName: this.person.firstName ? this.person.firstName : '',
      lastName: this.person.lastName ? this.person.lastName : '',
      emailAddress: this.person.emailAddress ? this.person.emailAddress : '',
      phoneNumber: this.person.phoneNumber ? this.person.phoneNumber : ''
    });

    // Add event handlers to update the data model when the form model changes
    const sub = this.personForm.valueChanges.subscribe(value => {
      that.person.firstName = value.firstName;
      that.person.lastName = value.lastName;
      that.person.emailAddress = value.emailAddress;
      that.person.phoneNumber = value.phoneNumber;
    });
    this.subs.push(sub);

    // Add this component's form to the parent form
    // The below statement was enclosed in setTimeout to shift the assignment
    // to the next macro task in Javascript. This avoids change detection
    // errors from being triggered.
    setTimeout(() => {
      if (that.form) {
        that.form.addControl('person', that.personForm);
      }
    });
  }

  setFormData(person: Person) {
    this.personForm.patchValue({
      firstName: this.person.firstName,
      lastName: this.person.lastName,
      emailAddress: this.person.emailAddress,
      phoneNumber: this.person.phoneNumber
    });

    this.addressComponent.setFormData(person.address);
  }
}
