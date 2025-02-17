import { Component,Output,EventEmitter,OnInit,Input} from '@angular/core';

@Component({
  selector: 'app-filters',
  standalone: false,
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent{
  @Output() buildingFilterChange = new EventEmitter<string>();
  @Output() floorFilterChange = new EventEmitter<string>();
  @Output() capacityFilterChange = new EventEmitter<string>();

  

  @Input() rooms: any[] = [];

  onBuildingChange(event: any) {
    this.buildingFilterChange.emit(event.target.value);
  }

  onFloorChange(event: any) {
    this.floorFilterChange.emit(event.target.value);
  }

  onCapacityChange(event: any) {
    this.capacityFilterChange.emit(event.target.value);
  }
}
