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

  public isBookedTimestampSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);

  public setIsBookedTimestampSubject(value: boolean){
    if(value){
      this.isBookedTimestampSubject.next(value);
    } else {
      this.isBookedTimestampSubject.next(null);
    }
  }

  public seanceSubject: BehaviorSubject<Seance> = new BehaviorSubject(null);

  public setSeanceSubject(value: Seance){
    if(value){
      console.log("value", value);
      this.seanceSubject.next(value);
    } else {
      this.seanceSubject.next(null);
    }
  }

  public addSeanceToCommand(command: Command, username: string){
    this.httpClient.post<Seance>('http://localhost:8080/seancectrl/addseance/' + command.idCommand + '/' + username, null).subscribe(
        (seance) =>{ 
          command.items.push(seance); 
          this.commandService.setCommandSubject(command);
          this.setSeanceSubject(seance);  
        },
        (error) => { console.log("init seance pb : ", error); }
    );
  }

  public removeSeanceFromCommand(command: Command, seance: Seance){
    this.httpClient.delete('http://localhost:8080//seancectrl/deleteseance/' + seance.idItem).subscribe(
        () =>{ 
          console.log("reset seance OK : ",seance.idItem);
          command.items.splice(command.items.findIndex((item)=> item.idItem === seance.idItem), 1); 
          this.commandService.setCommandSubject(command); 
          console.log("reset command : ", command);
        },
        (error) => { console.log("init timestamp pb : ", error); }
    );
  }

  public addTimestampFacilityToSeance(seance: Seance, refFimestamp: string, facilityName: string, facilityCategoryName: string){
    this.httpClient.post<TimestampFacility>('http://localhost:8080//timestampfacilityctrl/addtimestampfacility/' + seance.idItem + '/' +
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

  public removeTimestampFacilityFromSeance(seance: Seance, idTimestampFacility: number){
    this.httpClient.delete('http://localhost:8080//timestampfacilityctrl/deletetimestampfacility/' + idTimestampFacility).subscribe(
        () =>{ 
          console.log("reset timestamp OK : ");
          seance.timestampFacilities.splice(seance.timestampFacilities.findIndex((timestampFacility)=> timestampFacility.idTimestampFacility === idTimestampFacility), 1); 
           //this.commandService.setCommandSubject(command);
          this.setSeanceSubject(seance);  
        },
        (error) => { console.log("init timestamp pb : ", error); }
    );
  }
}



