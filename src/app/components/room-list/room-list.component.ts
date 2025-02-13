import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingRoom } from '../../meeting-room.service';

@Component({
  selector: 'app-room-list',
  standalone: false,
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent {
  @Input() rooms: any[] = [];

  constructor(private router: Router){}

  navigateToBooking(roomId: number) {
    this.router.navigate(['/booking',roomId]);
  }
}
