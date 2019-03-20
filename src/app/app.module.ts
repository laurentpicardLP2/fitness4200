import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { SeanceBookingComponent } from './booking/seance-booking/seance-booking.component';
import { TokenStorageService } from './services/token-storage.service';
import { CustomerNewComponent } from './user/customer-new/customer-new.component';
import { FacilityBookingComponent } from './booking/facility-booking/facility-booking.component';
import { FacilityCategoryBookingComponent } from './booking/facility-category-booking/facility-category-booking.component';
import { LoginComponent } from './user/login/login.component';
import { TimestampFacilityComponent } from './booking/timestamp-facility/timestamp-facility.component';
import { CommandListingComponent } from './synthese/command-listing/command-listing.component';
import { SeanceListingComponent } from './synthese/seance-listing/seance-listing.component';
import { SeanceDetailComponent } from './synthese/seance-detail/seance-detail.component';
import { FacilityNewComponent } from './admin/facility-new/facility-new.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    SeanceBookingComponent,
    CustomerNewComponent,
    FacilityBookingComponent,
    FacilityCategoryBookingComponent,
    LoginComponent,
    TimestampFacilityComponent,
    CommandListingComponent,
    SeanceListingComponent,
    SeanceDetailComponent,
    FacilityNewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatIconModule,
    FlexLayoutModule
  ],
  providers: [TokenStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
