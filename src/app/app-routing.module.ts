import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BookingComponent } from './pages/booking/booking.component';

const routes: Routes = [
  { path: '', component: DashboardComponent }, // Default route
  { path: 'dashboard', component: DashboardComponent },
  { path: 'booking', component: BookingComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
