import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerNewComponent } from './customer-new/customer-new.component';
import { SeanceBookingComponent } from './seance-booking/seance-booking.component';

const routes: Routes = [
  { path: 'customer-new', component: CustomerNewComponent },
  { path: 'seance-booking', component: SeanceBookingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
