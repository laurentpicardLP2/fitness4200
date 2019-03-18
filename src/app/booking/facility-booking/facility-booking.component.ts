import { Command } from 'src/app/models/command.model';
import { CommandService } from 'src/app/services/command.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { TimestampFacility } from 'src/app/models/timestamp-facility.model';
import { Seance } from 'src/app/models/seance.model';
import { SeanceService } from 'src/app/services/seance.service';
import { BookingService } from 'src/app/services/booking.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-facility-booking',
  templateUrl: './facility-booking.component.html',
  styleUrls: ['./facility-booking.component.css']
})
export class FacilityBookingComponent implements OnInit, OnDestroy {
  timestampFacilities: TimestampFacility[];
  refTimestamp: string;
  seance: Seance;
  facilityName: string;
  isEmptySeance: boolean;
  isBookedTimestamp: boolean;
  nbItems: string;
  command: Command;
  priceSeance: number[];
  totalPriceSeance : number = 0;

  constructor(private bookingService: BookingService,
              private seanceService: SeanceService,
              private loginService: LoginService,
              private commandService: CommandService, 
              private router: Router) { }

  ngOnInit() {

    this.seanceService.seanceSubject.subscribe(res => {
      this.seance = res;
      this.timestampFacilities = res.timestampFacilities;
      this.isEmptySeance = (this.timestampFacilities.length === 0);
    });

    this.bookingService.timestampSubject.subscribe(res => {
      this.refTimestamp = res;
    });

    this.seanceService.isBookedTimestampSubject.subscribe(res => {
      this.isBookedTimestamp = res;
    });

    this.commandService.nbItemsSubject.subscribe(res => {
      this.nbItems = res;
    });

    this.commandService.commandSubject.subscribe(res => {
      this.command = res;
    });

    this.seanceService.priceSeanceSubject.subscribe(res => {
      this.priceSeance = res;
      if(this.priceSeance.length>0) {
        this.totalPriceSeance = this.priceSeance.reduce((n1, n2) => n1 + n2);
      } else {
        this.totalPriceSeance = 0;
      }
    });

  }

  public onDeleteTimestamp(index, idTimestampFacility) {
    console.log("onDeleteTimestamp(), id :", idTimestampFacility);
    console.log("index :", index);
    this.seanceService.removeTimestampFacilityFromSeance(this.seance, idTimestampFacility, this.refTimestamp);
    this.priceSeance.splice(index, 1);

    // implémenter un promise
    this.seanceService.setPriceSeanceSubject(this.priceSeance);
  }

  public getDateSeance(): string{
    let splittedTimestamp = this.refTimestamp.split("_");
    let yyyy = splittedTimestamp[0];
    let mm = splittedTimestamp[1];
    let dd = splittedTimestamp[2]
    return dd + '/' + mm + '/' + yyyy;
  }

  public convertIntoTime(pRefTimestamp): string{
    let splittedTimestamp = pRefTimestamp.split("_");
    let hh = splittedTimestamp[3];
    let min = splittedTimestamp[4];
    return hh + ':' + min;
  }

  public onValidateSeance(){
    
    if(this.nbItems==null || this.nbItems==undefined || this.nbItems=="") {
      this.nbItems = "0"; 
    }
    this.seanceService.addDateAndNbTimestamp(this.seance);
    this.commandService.setNbItemsSubject((parseInt(this.nbItems, 10) + 1).toString());
    this.command.items[this.command.items.findIndex((item)=> item.idItem == this.seance.idItem)].price= this.totalPriceSeance;
    this.commandService.setCommandSubject(this.command);
    this.bookingService.setListCommandItemsSubject(this.command.items);
    this.seanceService.setIsValidateSeanceSubject(true);
    this.seanceService.setPriceSeanceSubject([]);
    this.router.navigate(['']);
  }

  ngOnDestroy(){
    //this.seanceService.priceSeanceSubject.unsubscribe();
  }

}
