import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { FacilityAvailableAdaptater } from '../../models/facility-available-adaptater.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-facility-category-booking',
  templateUrl: './facility-category-booking.component.html',
  styleUrls: ['./facility-category-booking.component.css']
})
export class FacilityCategoryBookingComponent implements OnInit {
  panelOpenState = false;
  timestamp: string;
  listFacilityCategories: BehaviorSubject<FacilityAvailableAdaptater[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private httpClient: HttpClient
    ) { 
      
      }

  ngOnInit() {
    //this.timestamp = this.route.snapshot.params['timestamp']; // contient la tranche horaire sélectionnée
    this.bookingService.timestampSubject.subscribe(res => {
      this.timestamp = res;
      this.bookingService.publishFacilityCategories(this.timestamp);
      this.listFacilityCategories = this.bookingService.listFacilityCategories$;
    })
    

  }

  onBookingFacility(){
    console.log("onBookingFacility()")
    this.router.navigate(['/seance-booking', {outlets: {'facility-router-outlet' : ['facility-booking']}}]);
  }
  
}

