import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { parishes } from '../../shared.constants';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shr-parish-multiselect',
  templateUrl: './parish-multiselect.component.html',
  styleUrls: ['./parish-multiselect.component.scss']
})
export class ParishMultiselectComponent implements OnInit {
  

  @Input()
  disabled = false;
  @Input() 
  singleSelection = false;
  @Output()
  change: EventEmitter<string[]> = new EventEmitter<string[]>();
  
  //#region Settings
  dropdownSettings = {
    singleSelection: this.singleSelection,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  //#endregion



  // Get list of parishes from constants
  parishes = parishes.map(p => {
    return {
      id: p.name,
      text: p.name
    };
  });

  selectedParishes: string[] = [];
  selectedParishObjects: { id: string; text: string }[] = [];

  constructor() {}

  ngOnInit() {}

  onSelectionChange(parish: string, event: 'select' | 'deselect') {
    // Handle appropiate selection event to modify the selectedParishes array.
    if (event === 'select') {
      this.selectedParishes.push(parish);
    } else {
      this.selectedParishes.splice(this.selectedParishes.indexOf(parish), 1);
    }

    // Emit new parishes
    this.change.emit(this.selectedParishes);
  }

  onSelectAll(selectedParishes: string[]) {
    this.selectedParishes = selectedParishes;

    // Emit new parishes
    this.change.emit(this.selectedParishes);
  }

  parseSelectedParishes(selectedParishes: string[]) {
    // Parse Parishes to comply with ng-multiselect ngModel
    if (selectedParishes && selectedParishes.length > 0) {
      this.selectedParishObjects = selectedParishes.map(p => {
        return {
          id: p,
          text: p
        };
      });
    } else {
      this.selectedParishObjects = [];
    }

    // Set selected parishes property
    if (selectedParishes) {
      this.selectedParishes = selectedParishes;
    } else {
      this.selectedParishes = [];
    }
  }
}
