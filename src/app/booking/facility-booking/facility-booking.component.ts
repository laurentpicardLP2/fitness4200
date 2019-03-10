import { Component, OnInit } from '@angular/core';
import { CommandService } from '../../services/command.service';
import { Command } from '../../models/command.model';
import { TimestampFacility } from '../../models/timestamp-facility.model'

@Component({
  selector: 'app-facility-booking',
  templateUrl: './facility-booking.component.html',
  styleUrls: ['./facility-booking.component.css']
})
export class FacilityBookingComponent implements OnInit {
  timestampFacilities: TimestampFacility[]=[];

  constructor(private commandService: CommandService) { }

  ngOnInit() {
    this.commandService.commandSubject.subscribe(res => {
      //this.timestampFacilities = res.items;
    });
  }

}
