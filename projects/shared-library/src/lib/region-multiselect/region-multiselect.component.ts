import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { regions } from '../../shared.constants';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shr-region-multiselect',
  templateUrl: './region-multiselect.component.html',
  styleUrls: ['./region-multiselect.component.scss']
})
export class RegionMultiselectComponent implements OnInit {


  @Input()
  disabled = false;
  @Input()
  singleSelection = false;
  @Output()
  change: EventEmitter<string[]> = new EventEmitter<string[]>();

  // Get list of regions from constants
  regions = regions.map(p => {
    return p.name;
  });

   //#region Settings
   dropdownSettings = {
    singleSelection: this.singleSelection,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  //#endregion

  selectedRegions: string[] = [];
  selectedRegionObjects: { id: string; text: string }[] = [];

  constructor() {}

  ngOnInit() {}
  onSelectionChange(region: string, event: 'select' | 'deselect') {
    // Handle appropiate selection event to modify the selectedRegions array.
    if (event === 'select') {
      this.selectedRegions.push(region);
    } else {
      this.selectedRegions.splice(this.selectedRegions.indexOf(region), 1);
    }

    // Emit new regions
    this.change.emit(this.selectedRegions);
  }

  onSelectAll(selectedRegions: string[]) {
    this.selectedRegions = selectedRegions;

    // Emit new regions
    this.change.emit(this.selectedRegions);
  }

  parseSelectedRegions(selectedRegions: string[]) {
    // Parse Regions to comply with ng-multiselect ngModel
    if (selectedRegions && selectedRegions.length > 0) {
      this.selectedRegionObjects = selectedRegions.map(p => {
        return {
          id: p,
          text: p
        };
      });
    } else {
      this.selectedRegionObjects = [];
    }

    if (selectedRegions) {
      // Set selected regions property
      this.selectedRegions = selectedRegions;
    } else {
      this.selectedRegions = [];
    }
  }
}
