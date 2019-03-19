import { TimestampFacility } from 'src/app/models/timestamp-facility.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandService } from './command.service';
import { Seance } from 'src/app/models/seance.model';
import { Command } from 'src/app/models/command.model';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  constructor(private commandService: CommandService,
              private httpClient: HttpClient,
              private loginService: LoginService) { }

  public priceSeanceSubject: BehaviorSubject<number[]> = new BehaviorSubject(null);

  public setPriceSeanceSubject(value: number[]){
    if(value){
      this.priceSeanceSubject.next(value);
    } else {
      this.priceSeanceSubject.next(null);
    }
  }

  public isBookedTimestampSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);

  public setIsBookedTimestampSubject(value: boolean){
    if(value){
      this.isBookedTimestampSubject.next(value);
    } else {
      this.isBookedTimestampSubject.next(null);
    }
  }

  public isValidateSeanceSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);

  public setIsValidateSeanceSubject(value: boolean){
    if(value){
      this.isValidateSeanceSubject.next(value);
    } else {
      this.isValidateSeanceSubject.next(null);
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

  public addTimestampFacilityToSeance(seance: Seance, refFimestamp: string, nameFacility: string, nameFacilityCategory: string, dateOfTimestamp: Date){
    this.httpClient.post<TimestampFacility>('http://localhost:8080//timestampfacilityctrl/addtimestampfacility/' + seance.idItem + '/' +
    refFimestamp + '/' + nameFacility + '/' + nameFacilityCategory + '/' + dateOfTimestamp, null).subscribe(
        (timestampFacility) =>{ 
          timestampFacility.nameFacility = nameFacility;
          seance.timestampFacilities.push(timestampFacility); 
           //this.commandService.setCommandSubject(command);
          this.setSeanceSubject(seance);  
        },
        (error) => { console.log("init timestamp pb : ", error); }
    );
  }

  public addDateAndNbTimestamp(seance: Seance){
    this.httpClient.put<Seance>('http://localhost:8080//seancectrl/adddateandnbtimestamp/' + seance.idItem, null).subscribe(
        (updatedSeance) =>{ 
          console.log("updated seance OK : ", updatedSeance);
          this.setSeanceSubject(updatedSeance);  
        },
        (error) => { console.log("updated seance pb : ", error); }
    );
  }
 
  public removeTimestampFacilityFromSeance(seance: Seance,  idTimestampFacility: number, refTimestamp: string){
    this.httpClient.delete('http://localhost:8080//timestampfacilityctrl/deletetimestampfacility/' + idTimestampFacility).subscribe(
        () =>{ 
          console.log("reset timestamp OK : ");
          seance.timestampFacilities.splice(seance.timestampFacilities.findIndex((timestampFacility)=> timestampFacility.idTimestampFacility === idTimestampFacility), 1); 
           //this.commandService.setCommandSubject(command);
          this.setSeanceSubject(seance); 

          let isBookedTimestamp = false;
          for(let i=0; i< seance.timestampFacilities.length; i++){
            if(seance.timestampFacilities[i].refTimestamp === refTimestamp){
              isBookedTimestamp = true;
            }
          }
        console.log("this.isBookedTimestamp : ", isBookedTimestamp);
        this.setIsBookedTimestampSubject(isBookedTimestamp);
           
        },
        (error) => { console.log("init timestamp pb : ", error); }
    );
  }
}



