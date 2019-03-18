import { TimestampFacility } from 'src/app/models/timestamp-facility.model';
import { SyntheseService } from 'src/app/services/synthese.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-seance-detail',
  templateUrl: './seance-detail.component.html',
  styleUrls: ['./seance-detail.component.css']
})
export class SeanceDetailComponent implements OnInit {
  idItem: number;
  dayName: number;
	dayOfMonth: number;
  monthName: number;
  year: number;
  timstampFacilitiesList: BehaviorSubject<TimestampFacility[]> 
  editedTimestamp: TimestampFacility[];

  constructor(private route: ActivatedRoute,
              private syntheseService: SyntheseService,
              private router: Router) { }

  ngOnInit() {
    this.idItem = +this.route.snapshot.params.idItem;

    // this.syntheseService.getTimestampForASeance(this.idItem).subscribe(timestamp => {
    //   this.editedTimestamp = timestamp;
    //   console.log("this.editedTimestamp : ", this.editedTimestamp);
    //   // this.dayName = this.editedTimestamp[0].dayName;
    //   // this.dayOfMonth = this.editedTimestamp[0].dayOfMonth;
    //   // this.monthName = this.editedTimestamp[0].monthName;
    //   // this.year = this.editedTimestamp[0].year;
    // });

    this.syntheseService.publishTimestampFor(this.idItem);
    this.timstampFacilitiesList = this.syntheseService.listTimestampForASeance$
  }

  
}
