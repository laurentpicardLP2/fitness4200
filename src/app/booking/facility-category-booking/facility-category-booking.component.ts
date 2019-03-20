import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { FacilityAvailableAdaptater } from '../../models/facility-available-adaptater.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommandService } from 'src/app/services/command.service';
import { Command } from 'src/app/models/command.model';
import { SeanceService } from 'src/app/services/seance.service';
import { Seance } from 'src/app/models/seance.model';


@Component({
  selector: 'app-facility-category-booking',
  templateUrl: './facility-category-booking.component.html',
  styleUrls: ['./facility-category-booking.component.css']
})
export class FacilityCategoryBookingComponent implements OnInit, OnDestroy {
 // panelOpenState = false;
  refFimestamp: string;
  listFacilityCategories: BehaviorSubject<FacilityAvailableAdaptater[]>;
  command: Command;
  seance: Seance;
  nameFacility: string;
  isBookedTimestamp: boolean;
  isAvailableFacilites: boolean;
  isNotAvailableFacilities: boolean;
  priceSeance: number[]=[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private httpClient: HttpClient,
    private commandService: CommandService,
    private seanceService: SeanceService
    ) { 
      
      }

  ngOnInit() {
    //this.timestamp = this.route.snapshot.params['timestamp']; // contient la tranche horaire sélectionnée
    // => remplacé par un BehaviourSubject
    this.bookingService.timestampSubject.subscribe(res => {
      this.refFimestamp = res;
      this.bookingService.publishFacilityCategories(this.refFimestamp);
      this.listFacilityCategories = this.bookingService.listFacilityCategories$;
    });
    
    this.commandService.commandSubject.subscribe(res => {
      this.command = res;
    });

    this.seanceService.seanceSubject.subscribe(res => {
      this.seance = res;
    });

    this.seanceService.isBookedTimestampSubject.subscribe(res => {
      this.isBookedTimestamp = res;
    });

    this.bookingService.isNotAvailableFacilitiesSubject.subscribe(res => {
      this.isNotAvailableFacilities = res;
    });

    this.seanceService.priceSeanceSubject.subscribe(res => {
      this.priceSeance = res;
      console.log("this.priceSeance : ", this.priceSeance);
    });


  }

  onBookingFacility(nameFacility: string, nameFacilityCategory: string, priceFacilityCategory: number){
    this.priceSeance.push(priceFacilityCategory);
    this.seanceService.setPriceSeanceSubject(this.priceSeance);
    // this.seance.price = this.seance.price + priceFacilityCategory;
    // console.log(" this.seance.price : ", this.seance.price);
    this.seanceService.setSeanceSubject(this.seance);
    this.seanceService.addTimestampFacilityToSeance(this.seance, this.refFimestamp, nameFacility, nameFacilityCategory);
    this.seanceService.setIsBookedTimestampSubject(true);
    this.router.navigate(['/seance-booking', {outlets: {'facility-router-outlet' : ['facility-booking']}}]);
  }


  ngOnDestroy(){
    //this.seanceService.priceSeanceSubject.unsubscribe();
  }
  
}

