import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shr-card-link',
  templateUrl: './card-link.component.html',
  styleUrls: ['./card-link.component.scss']
})
export class CardLinkComponent implements OnInit {
  @Input() icon: string; // Input should look like 'fas fa-users
  @Input() route?: string;
  @Input() cssClass?: string;
  @Input() width: string;
  @Input() bodyPadding: string;
  @Input() description: string;
  @Input() innerHtml: string;
  constructor() {}

  ngOnInit() {
  }

  get cardWidth() {
    return this.width === undefined ? '100px' : this.width;
  }
  get cardBodyPadding() {
    return this.bodyPadding === undefined ? '.25rem' : this.bodyPadding;
  }
  get cardImgLinkName() {
    return this.imgLinkName === undefined ? '' : this.imgLinkName;
  }
  get cardRoute() {
    return this.route === undefined
      ? ''
      : this.route;
  }
}
