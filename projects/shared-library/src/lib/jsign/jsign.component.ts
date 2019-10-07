import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  AfterViewInit
} from '@angular/core';
declare var $;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shr-jsign',
  templateUrl: './jsign.component.html',
  styleUrls: ['./jsign.component.scss']
})
export class JsignComponent implements AfterViewInit, OnInit {
  @Input() b64signature: string;
  @Input() readonly: boolean;
  @Output() b64signatureChanged: EventEmitter<string>;
  private jsignatureDiv;
  private jsignatureCanvas2dContext;

  private get jsignature(): string {
    return this.jsignatureDiv.jSignature('getData', 'image/svg+xml;base64')[1];
  }

  private set jsignature(svgXmlB64: string) {
    if (this.b64signature === svgXmlB64) {
      return;
    }

    if (svgXmlB64 === undefined || svgXmlB64 == null) {
      // Clear signature
      this.jsignatureDiv.jSignature('clear');
      $('#signatureImg').attr('src', '');

      this.jsignatureDiv.show();
      $('#img-signature').hide();
    } else {
      this.setSignatureImage(svgXmlB64);
    }
  }

  constructor() {
    this.b64signatureChanged = new EventEmitter<string>();
  }

  clear() {
    if (this.b64signature != null) {
      this.jsignature = null;
      this.b64signature = null;
      this.removeStrokeShadow();
      this.triggerEvent();
    }
  }

  disable() {
    $('canvas.jSignature').addClass('no-ptr-evts');
  }

  enable() {
    $('canvas.jSignature').removeClass('no-ptr-evts');
  }

  ngAfterViewInit() {
    $('#clear-sign-btn').tooltip();
  }

  ngOnInit() {
    // grab the jsign html element
    this.jsignatureDiv = $('#jsignature');

    this.initializeJsign();

    // load signature if available
    if (this.b64signature) {
      this.setSignatureImage(this.b64signature);
    }
  }

  private initializeJsign() {
    // initialize the jsign drawable area
    this.jsignatureDiv.jSignature({
      color: '#046993',
      signatureLine: true
    });

    // This line must come after the initialization of the jsignature library because prior to then,
    // there is no HTML canvas.
    this.jsignatureCanvas2dContext = $('canvas')
      .get(0)
      .getContext('2d');

    // * This line fixes a bug where a shadow for our strokes was being applied for reasons unknown to Bobby
    this.removeStrokeShadow();

    // add event handler to continuously update the signature object
    const that = this;
    this.jsignatureDiv.bind('change', event => {
      that.b64signature = that.jsignature;
      that.triggerEvent();
    });
  }

  private removeStrokeShadow() {
    this.jsignatureCanvas2dContext.shadowColor = 'transparent';
  }

  private setSignatureImage(svgXmlB64: string) {
    // Format and set image data
    const jsignImageData = `data:image/svg+xml;base64,${svgXmlB64}`;
    $('#signatureImg').get(0).src = jsignImageData;

    this.jsignatureDiv.hide();
    $('#img-signature').show();
  }

  private triggerEvent() {
    this.b64signatureChanged.emit(this.b64signature);
  }
}
