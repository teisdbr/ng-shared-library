import {
  Injectable,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  TemplateRef,
  ComponentRef,
  EventEmitter
} from '@angular/core';
import swal, { SweetAlertOptions } from 'sweetalert2';
import { extend } from 'underscore';
import { DateTimePickerComponent } from '../lib/date-time-picker/date-time-picker.component';
import { Subscription } from 'rxjs';

declare var $: any;

@Injectable()
export class SwalService {
  private get defaults() {
    const options = {
      cancelButtonColor: '#046993',
      confirmButtonColor: '#004985',
      text: '',
      onOpen: () => swal.hideLoading()
    } as SweetAlertOptions;

    if ($('body').hasClass('modal-open')) {
      options.target = '.modal-content';
    }

    return options;
  }
  private partialRef: ComponentRef<DateTimePickerComponent>;
  private dateTimeEmitter: EventEmitter<Date>;
  private resolvedDate: Date;
  private dateTimeSub: Subscription;

  constructor(
    private readonly resolver: ComponentFactoryResolver,
    private readonly injector: Injector,
    private readonly app: ApplicationRef
  ) {}

  dismiss(onComplete?: (modalElement: HTMLElement) => void) {
    swal.close();
  }

  error(options: SweetAlertOptions) {
    options = extend(
      this.defaults,
      { confirmButtonText: 'OK' } as SweetAlertOptions,
      options,
      { type: 'error' } as SweetAlertOptions
    );
    return swal.fire(options);
  }

  load(title: string, text: string = '') {
    const options = extend(this.defaults, {
      title: title,
      text: text,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
      onOpen: () => swal.showLoading()
    } as SweetAlertOptions);
    return swal.fire(options);
  }

  stopLoading() {
    const options = extend(this.defaults, {
      onOpen: () => swal.hideLoading()
    } as SweetAlertOptions);
    return swal.fire(options);
  }

  radio(
    options: SweetAlertOptions,
    pairs: { [key: string]: string }
  ): Promise<any> {
    options = extend(this.defaults, options, {
      inputOptions: pairs,
      inputValidator: result =>
        new Promise<any>(resolve => {
          result
            ? resolve()
            : resolve('You must select an option in order to proceed.');
        }),
      input: 'radio',
      showCancelButton: true
    } as SweetAlertOptions);
    return swal.fire(options);
  }

  select(options: SweetAlertOptions) {
    options = extend(this.defaults, options, {
      input: 'select',
      showCancelButton: true
    });

    return swal.fire(options);
  }

  selfDestructIn(
    options: SweetAlertOptions,
    callback: () => void,
    seconds: number = 3
  ) {
    const millisecondsToExplode = seconds * 1000;
    options = extend(this.defaults, options, {
      html: `<h3 id="selfDestructTimerLabel">${seconds}</h3>`,
      timer: millisecondsToExplode + 250,
      onOpen: () => {
        const explosionOffset = 100;
        const tick = 1000;

        // * Keep the next 'var' keyword. We need var so that this variable shares scope with the lambda
        // * in the following 'setInterval' callback
        // tslint:disable-next-line:no-var-keyword
        var secondsTilExplosion = seconds;

        const explosionTimer = setInterval(() => {
          secondsTilExplosion -= 1;
          $('#selfDestructTimerLabel').html(secondsTilExplosion.toString());
        }, tick);

        setTimeout(
          () => clearInterval(explosionTimer),
          millisecondsToExplode + explosionOffset
        );
      },
      onClose: callback
    } as SweetAlertOptions);
    return this.unclosable(options);
  }

  success(options: SweetAlertOptions) {
    options = extend(
      this.defaults,
      { confirmButtonText: 'OK' } as SweetAlertOptions,
      options,
      { type: 'success' } as SweetAlertOptions
    );
    return swal.fire(options);
  }

  textarea(
    options: SweetAlertOptions,
    requisiteness: 'optional' | 'required',
    emtpyTextErrorMessage: string
  ): Promise<any> {
    options = extend(
      this.defaults,
      {
        cancelButtonText: 'Cancel',
        confirmButtonText: 'OK',
        inputPlaceholder: 'Enter your text here.',
        showCancelButton: true
      } as SweetAlertOptions,
      options,
      {
        input: 'textarea',
        inputValidator: result =>
          new Promise<any>(resolve => {
            if (
              requisiteness === 'optional' ||
              (result && result.toString().trim() !== '')
            ) {
              resolve();
            } else {
              resolve(emtpyTextErrorMessage);
            }
          })
      } as SweetAlertOptions
    );
    return swal.fire(options);
  }

  unclosable(options: SweetAlertOptions) {
    options = extend(this.defaults, options, {
      showConfirmButton: false,
      showCancelButton: false,
      allowEnterKey: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCloseButton: false
    } as SweetAlertOptions);
    return swal.fire(options);
  }

  warn(options: SweetAlertOptions) {
    options = extend(this.defaults, options, {
      type: 'warning'
    } as SweetAlertOptions);
    return swal.fire(options);
  }

  yesOrNo(options: SweetAlertOptions) {
    options = extend(this.defaults, options, {
      allowOutsideClick: false,
      allowEscapeKey: false,
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      type: 'question'
    } as SweetAlertOptions);

    return swal.fire(options);
  }

  show(options: SweetAlertOptions): Promise<any> {
    options = extend(this.defaults, options);
    return swal.fire(options);
  }

  getSwalDate(options: SweetAlertOptions): Promise<any> {
    const that = this;
    const newOptions: SweetAlertOptions = {
      ...this.defaults,
      ...options,
      onBeforeOpen: modalElement => {
        const factory = that.resolver.resolveComponentFactory(
          DateTimePickerComponent
        );
        // add class to resize datetimepicker
        modalElement.children[1].classList.add('px-5');

        that.partialRef = factory.create(
          that.injector,
          [],
          modalElement.children[1]
        );

        //  => Apply the consumer's template on the component
        const dateTimePickerInstance = that.partialRef.instance;
        dateTimePickerInstance.IsRequired = false;
        dateTimePickerInstance.showTime = false;
        that.dateTimeEmitter = dateTimePickerInstance.dateTimeChanged;
        that.dateTimeSub = that.dateTimeEmitter
          .asObservable()
          .subscribe(date => {
            that.resolvedDate = new Date(date);
          });
        // => Make the Angular app aware of that detached view so change detection works
        that.app.attachView(that.partialRef.hostView);
      },
      onClose: modalElement => {
        that.dateTimeSub.unsubscribe();
        that.app.detachView(that.partialRef.hostView);
        that.partialRef.destroy();
      },
      preConfirm: () => {
        return Promise.resolve(that.resolvedDate);
      }
    };
    return swal.fire(newOptions);
  }
}
