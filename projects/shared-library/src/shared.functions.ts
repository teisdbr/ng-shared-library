import { Location } from '@angular/common';
import { Router, UrlTree } from '@angular/router';
import { httpStatusCodeToErrorMap } from './shared.constants';
import { ValidationErrors } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
declare var jQuery: any;
export function getParamsObjectFromHash(): any {
  const hash = window.location.hash ? window.location.hash.split('#') : [];
  let toBeReturned = {};
  if (hash.length && hash[1].split('&').length) {
    toBeReturned = hash[1].split('&').reduce((acc, x) => {
      const hello = x.split('=');
      if (hello.length === 2) acc[hello[0]] = hello[1];
      return acc;
    }, {});
  }
  return Object.keys(toBeReturned).length ? toBeReturned : null;
}

export function parseEnum<T>(
  value: string,
  enumType: T
): T[keyof T] | undefined {
  if (!value) {
    return undefined;
  }

  // tslint:disable-next-line:forin
  for (const property in enumType) {
    if (property.toUpperCase() === value.toUpperCase()) {
      const key = (property as string) as keyof typeof enumType;
      return enumType[key];
    }
  }

  return undefined;
}
//#region DataTable Helper
export function datatableDateFormat(date: string){
  return (<any>window).moment(date).format('MM/DD/YYYY');
}
//#endregion
export function setTimezone(timezone: string, date: Date) {
  if (!date) {
    return date;
  }
  const parsedDate = new Date(deepCopy(date));
  const momentInTime = (<any>window).moment(parsedDate).tz(timezone);
  return momentInTime.toDate();
}

export function addYears(date: Date, count?: number): Date {
  if (date && Number(count)) {
    return new Date(
      ('0' + (date.getMonth() + 1)).slice(-2).toString() +
      '/' +
      ('0' + date.getDate()).slice(-2).toString() +
      '/' +
      (date.getFullYear() + count).toString()
    );
  }
  return date;
}

export function addMonths(date: Date, count?: number): Date {
  if (date && count > 0) {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    newDate.setMonth(newDate.getMonth() + count);
    return newDate;
  }
  return date;
}

export function addDays(date: Date, count?: number): Date {
  if (date) {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const testM = ('0' + (date.getMonth() + 1)).slice(-2).toString();
    // const testD = ('0' + (date.getDate() + count)).slice(-2).toString();
    const testD = date.getDate() + count;
    const testY = date.getFullYear().toString();
    return new Date(
      ('0' + (date.getMonth() + 1)).slice(-2).toString() +
      '/' +
      ('0' + (date.getDate() + count)).slice(-2).toString() +
      '/' +
      date.getFullYear().toString()
    );
    return newDate;
  }
  return date;
}

export function correctHeight() {
  const pageWrapper = jQuery('#page-wrapper');
  const navbarHeight = jQuery('nav.navbar-default').height();
  const wrapperHeight = pageWrapper.height();

  if (navbarHeight > wrapperHeight) {
    pageWrapper.css('min-height', navbarHeight + 'px');
  }

  if (navbarHeight <= wrapperHeight) {
    if (navbarHeight < jQuery(window).height()) {
      pageWrapper.css('min-height', jQuery(window).height() + 'px');
    } else {
      pageWrapper.css('min-height', navbarHeight + 'px');
    }
  }

  if (jQuery('body').hasClass('fixed-nav')) {
    if (navbarHeight > wrapperHeight) {
      pageWrapper.css('min-height', navbarHeight + 'px');
    } else {
      pageWrapper.css('min-height', jQuery(window).height() - 60 + 'px');
    }
  }
}

export function convertUrlTreeToString(
  urlTree: UrlTree,
  router: Router,
  location: Location
): string {
  const urlString = router.serializeUrl(urlTree);
  return window.location.origin + location.prepareExternalUrl(urlString);
}

export function isDateRangeValid(
  dates: Date[],
  compareTime: boolean,
  onOrAfter: boolean
) {
  // * dates array should have 2 elements
  // first date is start date and second is end date

  // Both dates should be valid ones, this fix was added to safeguard against arrays that had either one of the members as null or undefined
  if (
    dates &&
    (dates.length !== 2 || dates.findIndex(d => (d ? false : true)) !== -1)
  ) {
    return false;
  }

  if (compareTime) {
    // When comparing time, just return with the default comparison
    return dates[0] < dates[1];
  } else if (onOrAfter) {
    return (
      // Wrapping both dates in a new date contructor sets time to 00:00.000 for both new dates
      new Date(dates[0].toDateString()) <= new Date(dates[1].toDateString())
    );
  } else {
    // Set start date to latest time it could be
    // End date does not need to be formatted

    const startDate = new Date(dates[0].toDateString());
    startDate.setHours(23);
    startDate.setMinutes(59);
    startDate.setSeconds(59);
    startDate.setMilliseconds(999);

    return startDate < dates[1];
  }
}

export function detectBody() {
  if (jQuery(document).width() < 769) {
    jQuery('body').addClass('body-small');
  } else {
    jQuery('body').removeClass('body-small');
  }
}

export function formatDate(date?: Date): string {
  // Ensure date is not null
  if (date == null) {
    return '';
  }

  return (
    date.getFullYear().toString() +
    '-' +
    ('0' + (date.getMonth() + 1)).slice(-2).toString() +
    '-' +
    ('0' + date.getDate()).slice(-2).toString()
  );
}

export function formatDateForDatatables(date: Date) {
  // Date is null or undefined
  if (!date) {
    return null;
  }

  // Ensure date is always strongly typed
  const processedDate = new Date(date);

  return formatDateForDisplay(processedDate);
}

export function formatDateForDisplay(date?: Date, datestring?: string): string {
  let datearray = '';
  if (date != null) {
    return (
      ('0' + (date.getMonth() + 1)).slice(-2).toString() +
      '/' +
      ('0' + date.getDate()).slice(-2).toString() +
      '/' +
      date.getFullYear().toString()
    );
  }

  if (datestring != null) {
    if (datestring.includes('T')) {
      datearray = datestring.split('T')[0];
    } else {
      datearray = datestring;
    }
  }

  const splitdate = datearray.split('-');
  const day = splitdate[2];
  const month = splitdate[1];
  const year = splitdate[0];
  return month + '/' + day + '/' + year;
}

export function get90DateRange() {
  const dateRange: Date[] = [];

  const presentDate: Date = new Date(Date.now());
  const initialDate: Date = new Date(Date.now());
  initialDate.setDate(initialDate.getDay() - 90);

  dateRange.push(initialDate);
  dateRange.push(presentDate);

  return dateRange;
}

export function getDateSpanElementForDatatable(date) {
  if (!date || date.toString() === '') {
    return '';
  }

  const d = new Date(date);
  return `<span title="${d.toLocaleString()}">${d.toLocaleDateString()}</span>`;
}

export function ignoreTimeStamp(date?: Date): Date {
  if (!date) {
    date = new Date();
  }
  return new Date(new Date(date).toDateString());
}

export function round(n: number, decimalPlaces: number): number {
  if (decimalPlaces === 0) {
    return Math.round(n);
  }

  decimalPlaces = Math.round(decimalPlaces);
  const precision = Math.pow(10, decimalPlaces);
  const negligentOffset = 1 / Math.pow(10, decimalPlaces + 2);
  return Math.round((n + negligentOffset) * precision) / precision;
}

export function smoothlyMenu() {
  if (
    !jQuery('body').hasClass('mini-navbar') ||
    jQuery('body').hasClass('body-small')
  ) {
    // Hide menu in order to smoothly turn on when maximize menu
    jQuery('#side-menu').hide();
    // For smoothly turn on menu
    setTimeout(function () {
      jQuery('#side-menu').fadeIn(400);
    }, 200);
  } else if (jQuery('body').hasClass('fixed-sidebar')) {
    jQuery('#side-menu').hide();
    setTimeout(function () {
      jQuery('#side-menu').fadeIn(400);
    }, 100);
  } else {
    // Remove all inline style from jquery fadeIn function to reset menu state
    jQuery('#side-menu').removeAttr('style');
  }
}

export function deepCopy(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Finds the difference between two arrays.
 *
 *It removes the elements in the first array which matches any element in the second array.
 *
 * @access     public
 *
 * @param {Array}   array1      This is the array which will have its elements removed.
 * @param {Array}   array2      This array is used to check for elements which contain in array1.
 *
 * @return {Array} The result of the operation array1 - array2.
 */
export function arrayDifference(array1: any[], array2: any[]) {
  return array1.filter(element => array2.indexOf(element) < 0);
}

export function addTooltipToTableHeader(
  tableCssSelector: string,
  columnNumber: number,
  title: string,
  placement: 'top' | 'bottom' | 'left' | 'right'
) {
  const computedSelector = `${tableCssSelector} th:nth-child(${columnNumber})`;
  jQuery(computedSelector).attr({
    title: title,
    'data-toggle': 'tooltip',
    'data-placement': placement
  });

  jQuery(computedSelector).tooltip();
}

export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function isHttpStatusCode(statusCode: string) {
  return Object.keys(httpStatusCodeToErrorMap).includes(statusCode);
}
/**
 * @summary Creates an observer and sets up a callback to be called.
 * @param root An Element object which is an ancestor of the intended target, whose bounding rectangle will be considered the viewport.
 * @param rootMargin A string which specifies a set of offsets to add to the root's bounding_box when calculating intersections,
 * effectively shrinking or growing the root for calculation purposes.
 * @param threshold Either a single number or an array of numbers between 0.0 and 1.0, specifying a ratio of intersection area to total
 * bounding box area for the observed target
 * @param elementSelector Element to observe
 * @param callback Callback method to execute
 * @tutorial https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver
 */
export function observeElementInView(
  root: string,
  elementSelector: string,
  rootMargin: string,
  threshold: number[],
  callback: IntersectionObserverCallback
) {
  const options = {
    root: document.querySelector(root),
    rootMargin: rootMargin,
    threshold: threshold
  };

  let observer: any;

  // If no support, load polyfill
  if (hasNoIntersectionObserverSupport()) {
    observer = new IntersectionObserver(callback, options);
    observer.POLL_INTERVAL = 100; // Time in milliseconds.
  } else {
    observer = new IntersectionObserver(callback, options);
  }

  const target = document.querySelector(elementSelector);
  observer.observe(target);

  return observer;
}

function hasNoIntersectionObserverSupport() {
  if (
    !window['IntersectionObserver'] &&
    !window['IntersectionObserverEntry'] &&
    !window['IntersectionObserverEntry']['prototype']['intersectionRatio']
  ) {
    return true;
  }
  return false;
}

export function displayFormValidationErrors(
  errors: ValidationErrors,
  htmlFormatter: (error: string) => string = error => error
) {
  // Every key of the errors is an error
  const keys = Object.keys(errors);

  // Format each value, this assume the value is just a string
  return keys.map(key => htmlFormatter(errors[key]));
}

export function handleError(error: HttpErrorResponse | any) {
  // In a real world app, you might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof HttpErrorResponse) {
    errMsg = `${error.status} - ${error.statusText || ''} ${error.message}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.log('Fantastic, it does not work!!');
  console.error(errMsg);
  return throwError(errMsg);
}

export function timeElapsed(startDate, endDate) {
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  var diff = endDate.getTime() - startDate.getTime();
  var days = Math.floor(diff / (60 * 60 * 24 * 1000));
  if (days > 0) {
    return `${days} days ago`;
  }
  var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
  if (hours > 0) {
    return `${hours} hours ago`;
  }
  var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
  if (minutes > 0) {
    return `${minutes} minutes ago`;
  }
  var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
  if (seconds > 0) {
    return `${seconds} seconds ago`;
  } else {
    return 'just now';
  }
}
