import { Command } from '../models/command.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SyntheseService {

  constructor(private httpClient: HttpClient) { }

  private listCommandsForAnUser: Command [] ;

  listCommandsForAnUser$: BehaviorSubject<Command[]> = new BehaviorSubject(null);

  
  public getCommandsForAnUser(username: string): Observable<Command[]> {
    console.log("username : ", username);
    return this.httpClient.get<Command[]>('http://localhost:8080/synthesectrl/getcommands/' + username);
  }

  public publishCommandsForAnUser(username: string) {
    this.getCommandsForAnUser(username).subscribe(
      CommandsForAnUserList => {
        this.listCommandsForAnUser = CommandsForAnUserList;
        this.listCommandsForAnUser$.next(this.listCommandsForAnUser);
      });
    }

}
