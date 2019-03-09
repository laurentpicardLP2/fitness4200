import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerNewComponent } from './user/customer-new/customer-new.component';
import { SeanceBookingComponent } from './booking/seance-booking/seance-booking.component';
import { FacilityCategoryBookingComponent } from './booking/facility-category-booking/facility-category-booking.component';
import { FacilityBookingComponent } from './booking/facility-booking/facility-booking.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  { path: 'customer-new', component: CustomerNewComponent },
  { path: 'login', component: LoginComponent },
  //{ path: 'seance-booking', component: SeanceBookingComponent},
  //{ path: 'facility-category-booking', component: FacilityCategoryBookingComponent},
  //{ path: 'facility-booking', component: FacilityBookingComponent, outlet: 'booking-router-outlet' }

  { path: 'seance-booking', component: SeanceBookingComponent, children: [
    { path: 'facility-category-booking', component: FacilityCategoryBookingComponent, outlet: 'facility-category-router-outlet' },
    { path: 'facility-booking', component: FacilityBookingComponent, outlet: 'facility-router-outlet' }] }

    // { path: 'seance-booking', component: SeanceBookingComponent, children: [
    //   { path: ':timestamp', component: FacilityCategoryBookingComponent, outlet: 'booking-router-outlet' }, 
    // ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
