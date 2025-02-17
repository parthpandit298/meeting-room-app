import { Component,OnInit } from '@angular/core';
import { MeetingRoom,MeetingRoomService } from '../../meeting-room.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  rooms: MeetingRoom[] = [];
  filteredRooms : MeetingRoom[] = [];

  private currentBuilding = 'all';
  private currentFloor = 'all';
  private currentCapacity = 'all';

  constructor(private mettingRoomService: MeetingRoomService) {}

  ngOnInit(): void {
    // Fetch data from backend on component load
    this.mettingRoomService.getAllRooms().subscribe({
      next: (data: MeetingRoom[]) => {
        // data = array of MeetingRoom objects
        this.rooms = data;
        this.filteredRooms = data; // default filter is everything
      },
      error: (error) => {
        console.error('Error fetching rooms: ', error);
      }
    });
  }

  onBuildingFilterChange(building: string) {
    this.filterRooms(building, this.currentFloor,this.currentCapacity);
  }

  onFloorFilterChange(floor: string) {
    this.filterRooms(this.currentBuilding, floor, this.currentCapacity);
  }

  onCapacityFilterChnage(capcity:string){
    this.filterRooms(this.currentBuilding,this.currentFloor,capcity);
  }

  private filterRooms(building: string, floor: string,capacity:string) {
    this.currentBuilding = building;
    this.currentFloor = floor;
    this.currentCapacity = capacity;

    // If your data does not have a string "Building X" in it,
    // you'll need to adapt the check here. For example:
    // Instead of room.location.includes(`Building ${building}`)
    // you might do something like:
    // room.buildingName === building
    // or handle 'all' as needed.
    this.filteredRooms = this.rooms.filter(room => {
      const matchesBuilding = (building === 'all') || (room.buildingName === building);
      const matchesFloor = (floor === 'all') || (room.floorNo.toString() === floor);
      const matchesCapacity = capacity === 'all'|| (room.capacity.toString() === capacity)
      return matchesBuilding && matchesFloor && matchesCapacity;
    });
  }

}
