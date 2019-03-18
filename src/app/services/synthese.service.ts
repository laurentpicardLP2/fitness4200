import { TimestampFacility } from 'src/app/models/timestamp-facility.model';
import { Command } from '../models/command.model';
import { Seance } from '../models/seance.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SyntheseService {

  constructor(private httpClient: HttpClient) { }

  private listCommandsForAnUser: Command [] ;
  private listSeancesForAnUser: Seance [] ;
  private listTimestampForASeance: TimestampFacility [] ;

  listCommandsForAnUser$: BehaviorSubject<Command[]> = new BehaviorSubject(null);
  listSeancesForAnUser$: BehaviorSubject<Seance[]> = new BehaviorSubject(null);
  listTimestampForASeance$: BehaviorSubject<TimestampFacility[]> = new BehaviorSubject(null);
  
  public getCommandsForAnUser(username: string): Observable<Command[]> {
    return this.httpClient.get<Command[]>('http://localhost:8080/synthesectrl/getcommands/' + username);
  }

  public getSeancesForAnUser(username: string): Observable<Seance[]> {
    return this.httpClient.get<Seance[]>('http://localhost:8080/synthesectrl/getseances/' + username);
  }

  public getTimestampForASeance(idItem): Observable<TimestampFacility[]> {
    return this.httpClient.get<TimestampFacility[]>('http://localhost:8080/synthesectrl/gettimestampfromaseance/' + idItem);
  }

  public publishCommandsForAnUser(username: string) {
    this.getCommandsForAnUser(username).subscribe(
      commandsForAnUserList => {
        this.listCommandsForAnUser = commandsForAnUserList;
        this.listCommandsForAnUser$.next(this.listCommandsForAnUser);
      });
    }

    public publishSeancesForAnUser(username: string) {
      this.getSeancesForAnUser(username).subscribe(
        seancesForAnUserList => {
          this.listSeancesForAnUser = seancesForAnUserList;
          this.listSeancesForAnUser$.next(this.listSeancesForAnUser);
        });
      }
  
    public publishTimestampFor(idItem: number) {
      this.getTimestampForASeance(idItem).subscribe(
        timestampForASeanceList => {
          console.log("timestampForASeanceList : ", timestampForASeanceList);
          this.listTimestampForASeance = timestampForASeanceList;
          this.listTimestampForASeance$.next(this.listTimestampForASeance);
        });
      }

}
