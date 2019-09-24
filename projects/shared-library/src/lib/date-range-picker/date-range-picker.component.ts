import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'shr-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements OnInit {
  @Input() elementId: string;
  @Input() cssClasses = '';
  @Input() selectedDateRange: Date[];
  @Output() selectedDateRangeChange: EventEmitter<Date[]> = new EventEmitter();
  @Input() show90Days = false;

  // All of the options below are intended only for making the ngx-bootstrap daterangepicker work.
  areLast90DaysSelected = false;
  colorTheme = 'theme-default';
  config: Partial<BsDatepickerConfig>;
  minDate = new Date(1990, 1, 1);
  maxDate = new Date(2020, 1, 1);
  validRange: any = [this.minDate, this.maxDate];

  get last90Days(): Date[] {
    const present = new Date();
    const days90ms = 90 * 24 * 60 * 60 * 1000;
    const startDate = new Date(present.getTime() - days90ms);
    const endDate = new Date(present);

    // Set start date to start-of-day and end date to end-of-day
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    return [startDate, endDate];
  }

  applyNgxBootstrapTheme() {
    // create new object on each property change
    // so Angular can catch object reference change
    this.config = Object.assign(
      {},
      { containerClass: this.colorTheme, showWeekNumbers: false }
    );
  }

  last90DaysChecked(val: boolean) {
    if (val) {
      this.selectedDateRange = this.last90Days;
      this.areLast90DaysSelected = true;
    } else {
      this.selectedDateRange = [];
      this.areLast90DaysSelected = false;
    }

    this.selectedDateRangeChange.emit(this.selectedDateRange);
  }

  // Date returned is not a javascript Date, but a string instead.
  newRangeSelected(dateRange: any[]) {
    if (dateRange && dateRange.length === 2) {
      // Convert dates to iso dates
      const startDate = new Date(dateRange[0]);
      const endDate = new Date(dateRange[1]);

      // Set start date to start-of-day and end date to end-of-day
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      const newRange = [startDate, endDate];
      const currentRange = [
        new Date(this.selectedDateRange[0]),
        new Date(this.selectedDateRange[1])
      ];

      // emit only if new values are different than current values
      if (
        currentRange[0].getTime() !== newRange[0].getTime() ||
        currentRange[1].getTime() !== newRange[1].getTime()
      ) {
        this.selectedDateRange.splice(0);
        this.selectedDateRange.push(...newRange);
        this.selectedDateRangeChange.emit(newRange);

        this.updateAreLast90DaysSelected();
      }
    }
  }

  ngOnInit() {
    // Apply Theme
    this.applyNgxBootstrapTheme();

    this.updateAreLast90DaysSelected();
  }

  resetAndFocusInput() {
    this.selectedDateRange = [];
    this.areLast90DaysSelected = false;
    this.selectedDateRangeChange.emit(this.selectedDateRange);
    $(`#${this.elementId}`).focus();
  }

  private updateAreLast90DaysSelected() {
    if (!this.selectedDateRange || this.selectedDateRange.length !== 2) {
      this.areLast90DaysSelected = false;
      return;
    }

    const last90 = this.last90Days;

    this.areLast90DaysSelected =
      this.selectedDateRange[0].getTime() === last90[0].getTime() &&
      this.selectedDateRange[1].getTime() === last90[1].getTime();
  }
}
