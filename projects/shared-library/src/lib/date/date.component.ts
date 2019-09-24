import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shr-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
  @Input() date: Date;

  ngOnInit() {
    this.date = this.date ? new Date(this.date) : null;
  }
}
