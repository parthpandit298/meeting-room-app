import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


  rooms = [
    { name: 'Room 1', location: 'Building A, Floor 1', nextAvailability: 'Available now', capacity: 6 },
    { name: 'Room 2', location: 'Building A, Floor 2', nextAvailability: 'Next available at 3:00 PM', capacity: 4 },
    { name: 'Room 3', location: 'Building B, Floor 1', nextAvailability: 'Next available at 3:00 PM', capacity: 8 },
    { name: 'Room 4', location: 'Building C, Floor 1', nextAvailability: 'Next available at 3:00 PM', capacity: 6 },
    { name: 'Room 2', location: 'Building C, Floor 2', nextAvailability: 'Next available at 3:00 PM', capacity: 8 },
    // Add more rooms here...
  ];

  filteredRooms = this.rooms;

  onBuildingFilterChange(building: string) {
    this.filterRooms(building, this.currentFloor);
  }

  onFloorFilterChange(floor: string) {
    this.filterRooms(this.currentBuilding, floor);
  }

  private currentBuilding = 'all';
  private currentFloor = 'all';

  private filterRooms(building: string, floor: string) {
    this.currentBuilding = building;
    this.currentFloor = floor;

    this.filteredRooms = this.rooms.filter(room => {
      const matchesBuilding = building === 'all' || room.location.includes(`Building ${building}`);
      const matchesFloor = floor === 'all' || room.location.includes(`Floor ${floor}`);
      return matchesBuilding && matchesFloor;
    });
  }

}
