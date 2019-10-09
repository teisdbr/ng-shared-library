import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn
} from '@angular/forms';
import { Subscription } from 'rxjs';
var zxcvbn = require('zxcvbn');
import { StrongPasswordValidator } from '../../../directives/strong-password.directive';
//const zxcvbn = require('zxcvbn');
declare var $: any;

@Component({
  selector: 'shr-new-password-input',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class PasswordInputComponent implements OnDestroy, OnInit {
  // Specific words to advise against
  dictionary: string[] = ['password', 'password123'];
  @Input() parentFormGroup: FormGroup;
  isPasswordVisible: boolean;
  minimumAcceptableStrength = '3';
  passwordFeedback = {};
  passwordInputFormGroup: FormGroup;
  passwordValidators: ValidatorFn[] = [Validators.required];
  @Input() showValidator = true;
  subs: Subscription[];
  value: string;

  constructor(private fb: FormBuilder) {
    this.isPasswordVisible = false;

    // Instantiate form group
    this.passwordInputFormGroup = fb.group({
      password: ['', this.passwordValidators]
    });

    // Instantiate
    this.subs = [];
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnInit() {
    // Enable popovers
    $('.password-field').popover({
      selector: '#password-feedback',
      trigger: 'hover',
      placement: 'top',
      container: 'body'
    });

    $('[data-toggle="popover"]').popover();

    $('[data-toggle="tooltip"]').tooltip();

    // Update data model whenever form model changes
    const that = this;

    this.subs.push(
      this.passwordInputFormGroup
        .get('password')
        .valueChanges.subscribe(password => {
          // Updates the password
          that.value = password;

          // Captures the feedback from the validator
          that.passwordFeedback = zxcvbn(password || '').feedback;
        })
    );

    // Add validations only if the wrapping component passes in a form group
    if (this.showValidator) {
      // Add a "required" validation to this component's password control
      this.passwordValidators.push(
        StrongPasswordValidator(this.minimumAcceptableStrength, this.dictionary)
      );
      this.passwordInputFormGroup
        .get('password')
        .setValidators(this.passwordValidators);
      this.passwordInputFormGroup.updateValueAndValidity();
    }

    if (this.parentFormGroup) {
      // Add this component's form group to the parent form group
      this.parentFormGroup.addControl(
        'passwordGroup',
        this.passwordInputFormGroup
      );
      this.parentFormGroup.updateValueAndValidity();
    }
  }

  // Current password strength emitted from the strength-meter: Can't think of a practical use!
  onStrength({ strength }) {
    $('.password-field').popover('show');
  }
}
