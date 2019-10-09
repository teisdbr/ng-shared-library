import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
  Validators
} from '@angular/forms';

var zxcvbn = require('zxcvbn');

/* Assess password strength via zxcvbn library  */
export function StrongPasswordValidator(
  level: string = '2',
  user_inputs: string[] = []
): ValidatorFn {
  const l: number = parseInt(level, 10);
  const requiredLevel: number = isNaN(l) ? 2 : Math.min(Math.max(0, l), 4);

  return (control: AbstractControl): { [key: string]: any } => {
    const { score, feedback = {} } = zxcvbn(control.value || '', user_inputs);
    const strong: boolean = score < requiredLevel;

    return strong
      ? {
          strongPassword: {
            valid: false,
            feedback,
            score
          }
        }
      : null;
  };
}



@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[strongPassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: StrongPasswordValidatorDirective,
      multi: true
    }
  ]
})

export class StrongPasswordValidatorDirective implements Validator, OnChanges {
  @Input() strongPassword: string;
  // tslint:disable-next-line:no-input-rename
  @Input('user_inputs') dictionary: string[];

  private valFn = Validators.nullValidator;
  private default_dictionary: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['strongPassword'];
    if (change) {
      this.valFn = StrongPasswordValidator(change.currentValue, [
        ...this.default_dictionary,
        ...this.dictionary
      ]);
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): { [key: string]: any } {
    return this.valFn(control);
  }
}

