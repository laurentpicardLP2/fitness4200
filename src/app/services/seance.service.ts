import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandService } from './command.service';
import { Seance } from '../models/seance.model';
import { Command } from '../models/command.model';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  constructor(private commandService: CommandService,
              private httpClient: HttpClient) { }

  public addSeanceToCommand(command: Command){
    this.httpClient.post<Seance>('http://localhost:8080/seancectrl/addseance/' + command.idCommand, null).subscribe(
        (seance) =>{ console.log("init seance OK : ", seance); command.items.push(seance); console.log("command.items.length : ", command.items.length); this.commandService.setCommandSubject(command); },
        (error) => { console.log("init seance pb : ", error); }
    );
  }
}
