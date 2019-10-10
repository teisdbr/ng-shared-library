import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shr-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() showFooter = false;
  constructor() {}

  ngOnInit() {}
}
