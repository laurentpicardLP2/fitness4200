import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { FacilityAvailableAdaptater } from '../../models/facility-available-adaptater.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommandService } from '../../services/command.service';
import { Command } from '../../models/command.model';

@Component({
  selector: 'app-facility-category-booking',
  templateUrl: './facility-category-booking.component.html',
  styleUrls: ['./facility-category-booking.component.css']
})
export class FacilityCategoryBookingComponent implements OnInit {
  panelOpenState = false;
  timestamp: string;
  listFacilityCategories: BehaviorSubject<FacilityAvailableAdaptater[]>;
  currentCommand: Command;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private httpClient: HttpClient,
    private commandService: CommandService
    ) { 
      
      }

  ngOnInit() {
    //this.timestamp = this.route.snapshot.params['timestamp']; // contient la tranche horaire sélectionnée
    // => remplacé par un BehaviourSubject
    this.bookingService.timestampSubject.subscribe(res => {
      this.timestamp = res;
      this.bookingService.publishFacilityCategories(this.timestamp);
      this.listFacilityCategories = this.bookingService.listFacilityCategories$;
    });
    
    this.commandService.commandSubject.subscribe(res => {
      this.currentCommand = res;
    });
  }

  onBookingFacility(){
    console.log("this.currentCommand : ", this.currentCommand.items[this.currentCommand.items.length-1]);
    this.router.navigate(['/seance-booking', {outlets: {'facility-router-outlet' : ['facility-booking']}}]);
  }
  
}

