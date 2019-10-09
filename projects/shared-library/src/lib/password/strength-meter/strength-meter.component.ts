import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
var zxcvbn = require('zxcvbn');

@Component({
  selector: 'vf-strength-meter',
  templateUrl: './strength-meter.component.html',
  styleUrls: ['./strength-meter.component.scss']
})
export class StrengthMeterComponent implements OnInit, OnChanges {

  @Input() password = '';

  @Output() strength = new EventEmitter();

  passwordStrength = 0;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['password'];
    if (change) {
      this.getStrength(change.currentValue);
    }
  }

  getStrength(password) {
    const estimation = zxcvbn(password || '');
    this.passwordStrength = estimation.score;
    this.strength.emit({
      strength: this.passwordStrength
    });
  }

  getClass() {
    return `level-${this.passwordStrength}`;
  }

}
