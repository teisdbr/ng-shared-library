import { Component, Input } from '@angular/core';

@Component({
  selector: 'shr-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() isFooter? = false;
}
