import { TimestampFacility } from './../models/timestamp-facility.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandService } from './command.service';
import { Seance } from '../models/seance.model';
import { Command } from '../models/command.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  constructor(private commandService: CommandService,
              private httpClient: HttpClient) { }

  public seanceSubject: BehaviorSubject<Seance> = new BehaviorSubject(null);

  public setSeanceSubject(value: Seance){
    if(value){
      this.seanceSubject.next(value);
    } else {
      this.seanceSubject.next(null);
    }
  }

  // public facilityNameSubject: BehaviorSubject<string> = new BehaviorSubject(null);

  // public  setFacilityNameSubject(value: string){
  //     if(value){
  //       this.facilityNameSubject.next(value);
  //     } else {
  //       this.facilityNameSubject.next(null);
  //     }
  //   }

  public addSeanceToCommand(command: Command){
    this.httpClient.post<Seance>('http://localhost:8080/seancectrl/addseance/' + command.idCommand, null).subscribe(
        (seance) =>{ 
          command.items.push(seance); 
          this.commandService.setCommandSubject(command);
          this.setSeanceSubject(seance);  
        },
        (error) => { console.log("init seance pb : ", error); }
    );
  }

  public addTimestampFacilityToSeance(seance: Seance, refFimestamp: string, facilityName: string, facilityCategoryName: string){
    this.httpClient.post<TimestampFacility>('http://localhost:8080//timestampfacilityctrl/addtimestampfacility/' + 
    refFimestamp + '/' + facilityName + '/' + facilityCategoryName, null).subscribe(
        (timestampFacility) =>{ 
          console.log("init timestamp OK : ", timestampFacility);
          timestampFacility.facilityName = facilityName;
          seance.timestampFacilities.push(timestampFacility); 
           //this.commandService.setCommandSubject(command);
          this.setSeanceSubject(seance);  
        },
        (error) => { console.log("init timestamp pb : ", error); }
    );
  }
}



