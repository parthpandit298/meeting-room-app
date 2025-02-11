import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-list',
  standalone: false,
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent {
  @Input() rooms: any[] = [];

  constructor(private router: Router){}

  navigateToBooking() {
    this.router.navigate(['/booking']);
  }
}
