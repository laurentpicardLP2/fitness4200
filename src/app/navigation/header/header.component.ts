import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CommandService } from '../../services/command.service';
import { Command } from '../../models/command.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  isAuth: boolean;
  public command: Command;

  constructor(private loginService: LoginService,
              private commandService: CommandService) { }

  ngOnInit(){
    this.loginService.loginSubject.subscribe(res => {
      this.isAuth = res;
    });

    this.commandService.commandSubject.subscribe(res => {
      this.command = res;
    });
  }
 

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}


  
