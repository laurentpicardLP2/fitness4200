import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerNewComponent } from './user/customer-new/customer-new.component';
import { SeanceBookingComponent } from './booking/seance-booking/seance-booking.component';
import { FacilityCategoryBookingComponent } from './booking/facility-category-booking/facility-category-booking.component';
import { FacilityBookingComponent } from './booking/facility-booking/facility-booking.component';
import { LoginComponent } from './user/login/login.component';
import { CommandListingComponent } from './synthese/command-listing/command-listing.component';
import { SeanceListingComponent } from './synthese/seance-listing/seance-listing.component';
import { SeanceDetailComponent } from './synthese/seance-detail/seance-detail.component';
import { FacilityNewComponent } from './admin/facility-new/facility-new.component';
import { TimestampFacilityComponent } from './booking/timestamp-facility/timestamp-facility.component';


const routes: Routes = [
  { path: 'customer-new', component: CustomerNewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'command-listing', component: CommandListingComponent },
  { path: 'seance-listing', component: SeanceListingComponent },
  { path: 'seance-detail/:idItem', component: SeanceDetailComponent},
  { path: 'facility-new', component: FacilityNewComponent},
  { path: 'chart', component: TimestampFacilityComponent },
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
