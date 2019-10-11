import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fiscalYears } from '../../shared.constants';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shr-fiscal-year-multiselect',
  templateUrl: './fiscal-year-multiselect.component.html',
  styleUrls: ['./fiscal-year-multiselect.component.scss']
})
export class FiscalYearMultiselectComponent implements OnInit {
  dropdownSettings = {
    singleSelection: false,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  //#endregion

  @Input()
  disabled = false;
  @Output()
  change: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Input()
  selectedValues: string[];

  // Get list of parishes from constants
  years = fiscalYears.map(p => {
    return {
      id: p.name,
      text: p.name
    };
  });

  selectedYears: string[] = [];
  selectedYearObjects: { id: string; text: string }[] = [];


  constructor() { }

  ngOnInit() {
    if (this.selectedValues.length > 0) {
      this.selectedYearObjects = this.selectedValues.map(p => {
        return {
          id: p,
          text: p
        };
      });
    }


  }



    onSelectionChange(year: string, event: 'select' | 'deselect') {
      // Handle appropiate selection event to modify the selectedParishes array.
      if (event === 'select') {
        this.selectedYears.push(year);
      } else {
        this.selectedYears.splice(this.selectedYears.indexOf(year), 1);
      }
      // Emit new parishes
      this.change.emit(this.selectedYears);
    }
    onSelectAll(selectedYears: string[]) {
      this.selectedYears = selectedYears;

      // Emit new parishes
      this.change.emit(this.selectedYears);
    }

    parseSelectedParishes(selectedYears: string[]) {
      // Parse Parishes to comply with ng-multiselect ngModel
      if (selectedYears && selectedYears.length > 0) {
        this.selectedYearObjects = selectedYears.map(p => {
          return {
            id: p,
            text: p
          };
        });
      } else {
        this.selectedYearObjects = [];
      }

      // Set selected parishes property
      if (selectedYears) {
        this.selectedYears = selectedYears;
      } else {
        this.selectedYears = [];
      }
    }

}
