import { Component, OnInit } from '@angular/core';

import { TimestampFacility } from 'src/app/models/timestamp-facility.model';
import { Seance } from 'src/app/models/seance.model';
import { SeanceService } from 'src/app/services/seance.service';
import { BookingService } from 'src/app/services/booking.service';


@Component({
  selector: 'app-facility-booking',
  templateUrl: './facility-booking.component.html',
  styleUrls: ['./facility-booking.component.css']
})
export class FacilityBookingComponent implements OnInit {
  timestampFacilities: TimestampFacility[];
  refTimestamp: string;
  seance: Seance;
  facilityName: string;
  value = 'Clear me';

  constructor(private bookingService: BookingService,
              private seanceService: SeanceService) { }

  ngOnInit() {

    this.seanceService.seanceSubject.subscribe(res => {
      this.seance = res;
      this.timestampFacilities = res.timestampFacilities;
    });

    this.bookingService.timestampSubject.subscribe(res => {
      this.refTimestamp = res;
    });

    // this.commandService.commandSubject.subscribe(res => {
    //   this.command = res;
    // });


    // this.commandService.commandSubject.subscribe(res => {
      
    //   console.log("facility-booking ", res.items[res.items.length-1]) ;
      
    // });
  }

  public onDeleteTimestamp(idTimestampFacility) {
    console.log("onDeleteTimestamp(), id :", idTimestampFacility);
    this.seanceService.removeTimestampFacilityFromSeance(this.seance, idTimestampFacility);
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
    let scliceMm = splittedTimestamp[4];
    return hh + ':' + scliceMm + '0';
  }

}
