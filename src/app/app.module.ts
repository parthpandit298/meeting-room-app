import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FiltersComponent } from './components/filters/filters.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { BookingComponent } from './pages/booking/booking.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { ScheduleModule,DayService,WeekService,WorkWeekService,MonthService } from '@syncfusion/ej2-angular-schedule'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    FiltersComponent,
    RoomListComponent,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    ScheduleModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    DayService,WeekService,WorkWeekService,MonthService,
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
