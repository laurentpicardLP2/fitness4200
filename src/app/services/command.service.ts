import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Command } from '../models/command.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(private httpClient: HttpClient,
              private router: Router) { }
  
  public commandSubject: BehaviorSubject<Command> = new BehaviorSubject(null);

  public setCommandSubject(value: Command){
    if(value){
      this.commandSubject.next(value);
    } else {
      this.commandSubject.next(null);
    }
  }

  public initCommand(user: User){
    this.httpClient.post<Command>('http://localhost:8080/commandctrl/addcommand/' + user.username, null).subscribe(
        (command) =>{ console.log("init command OK : ", command); this.setCommandSubject(command); this.router.navigate(['']);},
        (error) => { console.log("init command pb : ", error); this.setCommandSubject(null); this.router.navigate(['']);}
    );
    
  }
}
