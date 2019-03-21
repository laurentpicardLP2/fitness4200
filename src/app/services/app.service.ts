import { TokenStorageService } from 'src/app/services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { Command } from '../models/command.model';
import { CommandService } from './command.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  username: string;
  command: Command

  constructor(private commandService: CommandService,
              private httpClient: HttpClient,
              private router: Router,
              private token: TokenStorageService) { }

  public delCommand(){
    
    this.commandService.commandSubject.subscribe(res => {
      this.command = res;
    });

    if(this.command != undefined){
      this.httpClient.delete('http://localhost:8080/commandctrl/delcommand/' + this.command.idCommand, 
      {
      headers: {
      "Content-Type": "application/json",
      "Authorization": this.token.getToken()
      }
      }).subscribe(
        () => {this.router.navigate([''])},
        (error) => console.log("del command error", error)
      );
    }
  }

              
}
