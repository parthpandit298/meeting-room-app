import { Component,OnInit,viewChild,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { registerLicense } from '@syncfusion/ej2-base';
import { Booking,BookingService } from '../../booking.service';
import { View,EventSettingsModel,ScheduleComponent} from '@syncfusion/ej2-angular-schedule';
// 2. Call registerLicense with your license key
registerLicense('Ngo9BigBOggjHTQxAR8/V1NMaF5cXmBCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWX5ccXRURGlcUEN/XUU=');


@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit{

  // This will be bound to your template via [(ngModel)]
  newBooking: Booking = {
    meetingTitle: '',
    bookedBy: '',        // will be bound to your "Booked By" input
    meetingDate: '',     // storing as string for simplicity
    startTime: '',
    endTime: '',
    repeatBooking: 'none',
    description: ''
  };

  userName: string = 'John Doe';

  bookings: Booking[] = [];

  public setView: View = 'WorkWeek';
  public eventObject: EventSettingsModel = {
    dataSource: []
  }

  @ViewChild('schedule') public scheduleObj!: ScheduleComponent;

  constructor(
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    // Load existing bookings on initialization
    this.bookingService.getAllBookings().subscribe({
      next: (bookings) => {
        const events = bookings.map(b => this.toScheduleEvent(b));
        this.eventObject.dataSource = events;
      },
      error: (err) => console.error('Error fetching bookings:', err)
    });
  }

  // Convert a Booking to an event object compatible with the schedule
  private toScheduleEvent(booking: Booking) {
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
    // Create the booking by sending it to the backend
    this.bookingService.createBooking(this.newBooking).subscribe({
      next: (createdBooking) => {
        console.log('Booking created:', createdBooking);
        // Convert the new booking into a schedule event
        const newEvent = this.toScheduleEvent(createdBooking);

        // Option 1: Reassign the data source to a new array reference
        this.eventObject.dataSource = [
          ...(this.eventObject.dataSource as any[]),
          newEvent
        ];

        // Option 2: Refresh the schedule events (if needed)
        if (this.scheduleObj) {
          this.scheduleObj.refreshEvents();
        }

        // Reset the form for new booking entry
        this.newBooking = {
          meetingTitle: '',
          bookedBy: '',
          meetingDate: '',
          startTime: '',
          endTime: '',
          repeatBooking: 'none',
          description: ''
        };
      },
      error: (err) => {
        console.error('Error creating booking:', err);
      }
    });
  }
}
