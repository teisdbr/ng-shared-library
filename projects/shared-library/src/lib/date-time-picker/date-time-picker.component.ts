import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TimepickerConfig, BsDatepickerConfig } from 'ngx-bootstrap';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ValidatorFn
} from '@angular/forms';
import { setTimezone } from '../../shared.functions';

@Component({
  selector: 'shr-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]
})
export class DateTimePickerComponent implements OnInit, OnChanges, OnDestroy {
  @Output()
  dateTimeChanged: EventEmitter<Date> = new EventEmitter();
  @Input()
  form: FormGroup;
  @Input()
  IsRequired = true;
  @Input()
  showTime = true;
  @Input() dateValidator: ValidatorFn | ValidatorFn[];

  // This is the timezone that the browser reported, set in constructor
  currentUserTimeZone: string;
  dateTimeGroup: FormGroup;

  private subs: Subscription[] = [];
  private _date: Date;
  private cstDate: Date;

  // This is the default timezone to always display. This is based on ISO standard.
  // It will be either CST or CDT depending on the selected date.
  private timezone = 'America/Chicago';

  //#region implemented selectedDate getter and setter
  public get selectedDate(): Date {
    return this._date;
  }

  @Input()
  public set selectedDate(value: Date) {
    // Update the value of the underlying selected date property, private property _date
    this._date = value;

    // If the value passed is not null, compute and display the
    // timezone based on the data entry. Some cases it will be CDT and others CST
    // depending on whether or not the selected date falls under Daylight Savings or not.
    if (value) {
      this.currentUserTimeZone = (<any>window)
        .moment(value)
        .tz(this.timezone)
        .format('z'); // 'z' or lowercase z prints the 3 digit timezone code.
    }

    // Checks what is the time in CST based on variable "value" and sets that time in the current timezone.
    // if it 10 am in CST according to "value", then it will set 10 am in the current timezone of the client machine
    // This function is used only for the display purposes becuase we might want to show all times in CST no matter
    // where in the world the user is located.
    this.cstDate = setTimezone(this.timezone, value);
  }

  //#endregion

  //#region Theme Configuration
  public datePickerConfig: Partial<BsDatepickerConfig>;
  public timePickerConfig: Partial<TimepickerConfig>;

  applyControlThemes() {
    // create new object on each property change
    // so Angular can catch object reference change
    this.datePickerConfig = Object.assign(
      {},
      {
        containerClass: 'theme-default',
        showWeekNumbers: false,
        dateInputFormat: 'MM/DD/YYYY'
      }
    );
  }
  //#endregion

  constructor(private fb: FormBuilder) {}

 
  createDateTimeFromTwoDates(dateSource: Date, timeSource: Date): Date {
    // If time is not captured, return dateSource immediately
    if (!this.showTime || !timeSource) {
      return new Date(dateSource);
    }

    // Do to reading from form model, the dates are simply strings, not date objects
    // and so they must be parsed.
    const date = new Date(dateSource);
    const time = new Date(timeSource);

    // Update Date Source with Time from Time Source
    date.setHours(time.getHours(), time.getMinutes());

    // Return Date Source
    return date;
  }

  ngOnChanges() {
    if (this.dateTimeGroup && this.dateValidator) {
      this.dateTimeGroup.get('date').setValidators(this.dateValidator);
      this.dateTimeGroup.get('date').updateValueAndValidity();
    }
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnInit() {
    // Create a that object to use in closure or lambdas to
    // avoid using the this context based on the executer
    const that = this;

    // Create an accessor for the moment object
    const aMoment = (<any>window).moment;

    // Get the current user's timezone according to browser
    this.currentUserTimeZone = aMoment()
      .tz(this.timezone)
      .format('z');

    // Variable containing empty or formatted date
    let formattedSelectedDate: string;
    let formatSelectedTime: string;

    // If a time is set, ie from database, translate it, otherwise skip it
    if (this.selectedDate) {
      formattedSelectedDate = aMoment(this.selectedDate)
        .tz(this.timezone)
        .format('MM/DD/YYYY');
      formatSelectedTime = aMoment(this.selectedDate)
        .tz(this.timezone)
        .format('MM/DD/YYYY HH:mm');
    }
    // Create the dateTimeGroup with database values or blanks depending on logic above
    this.dateTimeGroup = this.fb.group({
      date: [
        formattedSelectedDate,
        this.IsRequired
          ? this.dateValidator || Validators.required
          : Validators.nullValidator
      ],
      time: [
        formatSelectedTime,
        this.showTime ? Validators.required : Validators.nullValidator
      ]
    });
    // Apply theme of the ngx-bootstrap date picker
    this.applyControlThemes();

    if (this.selectedDate) {
      const momentInTime = (<any>window).moment;
      formattedSelectedDate = momentInTime(this.selectedDate)
        .tz(this.timezone)
        .format('MM/DD/YYYY HH:mm');
    }
    if (this.form) {
      this.dateTimeGroup.patchValue({
        date: formattedSelectedDate,
        time: formattedSelectedDate
      });
      this.form.addControl('dateTimeGroup', this.dateTimeGroup);
    } else {
      this.dateTimeGroup = this.fb.group({
        date: [formattedSelectedDate],
        time: [formattedSelectedDate]
      });
    }

    // Set up value change subscription
    const sub = this.dateTimeGroup.valueChanges.subscribe(value => {
      // Interpreted Value
      let interpretedValue: string;
      let currentFormat: string;

      // Is it a date object or a string?
      // If it is a date object to format it to what user entered.
      if (value.date instanceof Date) {
        interpretedValue = getIsoFormattedString(value.date);
        currentFormat = this.showTime
          ? dateReadingFormats.isoString
          : dateReadingFormats.isoNoTime;
      } else {
        interpretedValue = value.date;
        currentFormat = dateReadingFormats.userEntered;
      }

      // Parse date value for safety checks below
      const dateObject: Date = (<any>window).moment
        .tz(interpretedValue, currentFormat, this.timezone)
        .toDate();

      if (that.form && that.form.disabled) {
        return;
      } else if (
        (that.dateTimeGroup.valid && that.dateTimeGroup.value['date']) ||
        (dateObject &&
          dateObject instanceof Date &&
          !isNaN(dateObject.getTime()))
      ) {
        // value changes is triggered event though there is no change in the actual values of the date and time
        // then just emit the existing value and return.
        if (
          dateObject &&
          value.time &&
          this.cstDate instanceof Date &&
          dateObject.toISOString() === this.cstDate.toISOString()
        ) {
          that.dateTimeChanged.emit(that.selectedDate);
          return;
        }
        // if there actual changes in the form then do this.
        const newDate = dateObject
          ? this.createDateTimeFromTwoDates(dateObject, value.time)
          : null;

        // If nullified, emit null value
        if (!newDate) {
          that._date = null;
          that.dateTimeChanged.emit(null);
          return;
        }

        if (
          (!that.selectedDate && newDate) ||
          new Date(that.selectedDate).toISOString() !== newDate.toISOString()
        ) {
          const convertedDate: Date = (<any>window).moment
            .tz(
              getIsoFormattedString(newDate),
              this.showTime
                ? dateReadingFormats.isoString
                : dateReadingFormats.isoNoTime,
              this.timezone
            )
            .toDate();

          this._date = convertedDate;

          that.dateTimeChanged.emit(that.selectedDate);
        }
      } else {
        that.dateTimeChanged.emit(null);
      }
    });

    // Add newly created subscription to the list.
    this.subs.push(sub);
  }
}

export function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
    hourStep: 1,
    minuteStep: 1,
    showMeridian: true,
    readonlyInput: false,
    mousewheel: true,
    showMinutes: true,
    showSeconds: false,
    showSpinners: false,
    dateInputFormat: 'hh:mm a'
  });
}

export function getIsoFormattedString(date: Date) {
  return (
    date.getFullYear() +
    '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + date.getDate()).slice(-2) +
    'T' +
    ('0' + date.getHours()).slice(-2) +
    ':' +
    ('0' + date.getMinutes()).slice(-2)
  );
}

// Interpreted Formats
/**
 * @summary Different formats interpreted from html controls for Date string representations
 * This is used to avoid using timezone or prevent shifting of datetime data.
 */
export const dateReadingFormats = {
  userEntered: 'MM/DD/YYYY hh:mm a Z',
  isoString: 'YYYY-MM-DDTHH:mm',
  isoNoTime: 'YYYY-MM-DD'
};
