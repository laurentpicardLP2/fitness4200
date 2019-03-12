import { Component, OnInit } from '@angular/core';
import { CommandService } from 'src/app/services/command.service';

import { Command } from 'src/app/models/command.model';
import { TimestampFacility } from 'src/app/models/timestamp-facility.model';
import { Seance } from 'src/app/models/seance.model';
import { SeanceService } from 'src/app/services/seance.service';

@Component({
  selector: 'app-timestamp-facility',
  templateUrl: './timestamp-facility.component.html',
  styleUrls: ['./timestamp-facility.component.css']
})
export class TimestampFacilityComponent implements OnInit {

  timestampFacilities: TimestampFacility[]
  seance: Seance;
  command: Command;
  

  constructor(private commandService: CommandService,
              private seanceService: SeanceService) { }

  ngOnInit() {

    // this.seanceService.seanceSubject.subscribe(res => {
    //   this.seance = res;
    //   this.timestampFacilities = res.timestampFacilities;
    //   console.log(" this.timestampFacilities : ",  this.timestampFacilities);
    // });

    // this.commandService.commandSubject.subscribe(res => {
    //   this.command = res;
    // });


    // this.commandService.commandSubject.subscribe(res => {
      
    //   console.log("facility-booking ", res.items[res.items.length-1]) ;
      
      
    // });
  }
}
