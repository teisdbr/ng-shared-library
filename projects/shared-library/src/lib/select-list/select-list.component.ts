import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'shr-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss']
})
export class SelectListComponent implements OnInit {
  // This is the list to display
  @Input() dataList: { display: string; value: string }[];

  @Input() selectionProperty: string;

  @Input() buttonDisplayValue: string;

  // Lambda to extract the desired value to return upon selection
  @Input() dataExtractor: (data: any) => string[];

  // Lambda to extract the desired value to return upon selection
  @Output() dataSelected: EventEmitter<{
    display: string;
    value: string;
  }> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  select(data: { display: string; value: string }) {
    this.dataSelected.emit(data);
  }
}
