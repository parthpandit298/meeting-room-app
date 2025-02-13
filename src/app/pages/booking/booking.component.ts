import { Component,OnInit,ViewChild,Input} from '@angular/core';
import { Router } from '@angular/router';
import { registerLicense } from '@syncfusion/ej2-base';
import { Booking,BookingService } from '../../booking.service';
import { View,EventSettingsModel} from '@syncfusion/ej2-angular-schedule';
import { ChangeDetectorRef } from '@angular/core';
import { ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { MeetingRoom,MeetingRoomService } from '../../meeting-room.service';
import { ActivatedRoute } from '@angular/router';
// 2. Call registerLicense with your license key
registerLicense('Ngo9BigBOggjHTQxAR8/V1NMaF5cXmBCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWX5ccXRURGlcUEN/XUU=');


@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit{

  rooms:MeetingRoom[] = [];
  selectedRoomId: number | null = null;

  // This will be bound to your template via [(ngModel)]
  newBooking: Booking = {
    meetingTitle: '',
    bookedBy: '',        // will be bound to your "Booked By" input
    meetingDate: '',     // storing as string for simplicity
    startTime: '',
    endTime: '',
    repeatBooking: 'none',
    description: '',
    meetingRoom:{} as MeetingRoom
  };

  userName: string = 'John Doe';

  bookings: Booking[] = [];

  public setView: View = 'WorkWeek';
  public eventObject: EventSettingsModel = {
    dataSource: []
  }

  constructor(
    private router: Router,
    private bookingService: BookingService,
    private meetingRoomService : MeetingRoomService,
    private cd: ChangeDetectorRef,
    private route:ActivatedRoute
  ) {}

  @ViewChild('schedule') public scheduleObj!: ScheduleComponent;


  ngOnInit(): void {
   this.loadBookings();
   // 1) Read route param
   this.route.paramMap.subscribe(params => {
    const roomIdParam = params.get('roomId');
    if (roomIdParam) {
      this.selectedRoomId = +roomIdParam;
      this.loadBookingsForRoom(this.selectedRoomId) // convert to number
    }
  });

  // 2) Load all meeting rooms (for the dropdown)
  this.meetingRoomService.getAllRooms().subscribe({
    next: (data) => {
      this.rooms = data;
    },
    error: (err) => console.error(err)
  });

  // 3) If we have a roomId from the route, load only that room’s bookings
  if (this.selectedRoomId) {
    this.loadBookingsForRoom(this.selectedRoomId);
  }

  }

  private loadBookingsForRoom(roomId: number): void {
    this.bookingService.getBookingsByRoom(roomId).subscribe({
      next: (bookings) => {
        const events = bookings.map(b => this.toScheduleEvent(b));
        this.eventObject = { ...this.eventObject, dataSource: events };
  
        // Force change detection and refresh the schedule
        this.cd.detectChanges();
        setTimeout(() => {
          if (this.scheduleObj) {
            this.scheduleObj.refresh();
          }
        }, 0);
      },
      error: (err) => console.error('Error fetching bookings:', err)
    });
  }

  onRoomChange() {
    if (this.selectedRoomId) {
      this.loadBookingsForRoom(this.selectedRoomId);
    }
  }
  
  ngAfterViewInit(): void {
    // After the view is initialized, force a refresh
    // This delay ensures that the Schedule component is fully rendered.
    setTimeout(() => {
      if (this.scheduleObj) {
        this.scheduleObj.refresh();
      }
    }, 100);
  }

  private loadBookings(): void {
    this.bookingService.getAllBookings().subscribe({
      next: (bookings) => {
        // Convert each Booking to an event object for the scheduler
        const events = bookings.map(b => this.toScheduleEvent(b));
        // Reassign a new data source to force change detection
        this.eventObject = { ...this.eventObject, dataSource: events };

        // Force change detection and refresh the schedule.
        this.cd.detectChanges();
        setTimeout(() => {
          if (this.scheduleObj) {
            this.scheduleObj.refresh();
          }
        }, 0);
      },
      error: (err) => console.error('Error fetching bookings:', err)
    });
  }

  // Convert a Booking to a Syncfusion schedule event object
  private toScheduleEvent(booking: Booking) {
    // Combine the meeting date and time to create proper Date objects
    const startDate = new Date(booking.meetingDate + 'T' + booking.startTime);
    const endDate = new Date(booking.meetingDate + 'T' + booking.endTime);
    return {
      Id: booking.id,
      Subject: booking.meetingTitle,
      StartTime: startDate,
      EndTime: endDate,
      Description: booking.description
    };
  }

  onUserNameChange(event: Event) {
    const target = event.target as HTMLInputElement; // Cast to HTMLInputElement
    this.userName = target.value; // Update the userName property
  }


  goBack() {
    this.router.navigate(['/']); // Navigate back to the dashboard
  }

  
  onSubmit() {
    if (!this.selectedRoomId) {
      alert('Please select a room before booking');
      return;
    }
  
    // Find the selected room in rooms array
    const selectedRoom = this.rooms.find(r => r.id === this.selectedRoomId);
    if (!selectedRoom) {
      alert('Invalid room selection');
      return;
    }
  
    // Set meetingRoom
    this.newBooking.meetingRoom = selectedRoom;
  
    this.bookingService.createBooking(this.newBooking).subscribe({
      next: (createdBooking) => {
        console.log('Booking created:', createdBooking);
  
        // Reload the bookings for the same room
        this.loadBookingsForRoom(this.selectedRoomId!);
  
        // Reset form
        this.newBooking = {
          meetingTitle: '',
          bookedBy: '',
          meetingDate: '',
          startTime: '',
          endTime: '',
          repeatBooking: 'none',
          description: '',
          meetingRoom: {} as MeetingRoom
        };
      },
      error: (err) => console.error('Error creating booking:', err)
    });
  }
  
  
}
